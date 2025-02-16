import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddPerformanceEventModal from './AddPerformanceEventModal';
import PerformanceDeleteModal from './PerformanceDeleteModal';
import getCreators from '../../services/creators.service';
import futurePerformancesService from '../../services/futurePerformances.service';
import performancesService from '../../services/performances.service';
import formatDate from '../../utils/formatDate';
import DefaultButton from '../misc/DefaultButton';

export default function PerformanceForm({ performance }) {
  const navigate = useNavigate();

  const [posterPreview, setPosterPreview] = useState(performance?.posterURL || null);
  const [imagesPreview, setImagesPreview] = useState(performance?.imagesURL || []);
  const [creatorOptions, setCreatorOptions] = useState([]);
  const [selectedCreators, setSelectedCreators] = useState(performance?.creators || []); // 🔥 Itt tároljuk az előadáshoz tartozó alkotókat
  const [selectedPerformanceEvents, setSelectedPerformanceEvents] = useState(
    performance?.performanceEvents || [],
  );
  const [isPosterDeleted, setIsPosterDeleted] = useState(false); // Deleted poster
  const [deletedImages, setDeletedImages] = useState([]); // Deleted pictures

  const [isModalOpen, setIsModalOpen] = useState(false); // modal for adding performanceEvent

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const targetAgeOptions = [
    { label: 'Felnőtt', value: 'adult' },
    { label: 'Gyerek', value: 'kid' },
    { label: 'Tini', value: 'teenager' },
    { label: 'Minden korosztály', value: 'every_age' },
  ];

  const initialValues = {
    title: performance?.title || '',
    theaterId: performance?.theaterId || '',
    creatorId: selectedCreators.map((creator) => creator.id), // 🔥 Itt állítjuk be a kiválasztott alkotókat
    description: performance?.description || '',
    posterURL: null,
    imagesURL: performance?.imagesURL || [],
    targetAudience: performance?.targetAudience || '',

    performanceEventId: selectedPerformanceEvents.map((performanceEvent) => performanceEvent.id),

    // Ha van futurePerformance, akkor alapértelmezetten legyen bepipálva
    plannedPerformance: !!performance?.futurePerformance,

    // Ha nincs, akkor a mezők legyenek üresek (elkerüli a hibát)
    targetBudgetIdeal: performance?.futurePerformance?.targetBudgetIdeal ?? '',
    targetBudget: performance?.futurePerformance?.targetBudget ?? '',
    minimumBudget: performance?.futurePerformance?.minimumBudget ?? '',
    actualBudget: performance?.futurePerformance?.actualBudget ?? '',
    gift: performance?.futurePerformance?.gift ?? '',
  };

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const creators = await getCreators.getCreators();
        console.log('Alkotók betöltve:', creators); // 🔍 Ellenőrzés a konzolon
        setCreatorOptions(creators);

        // Ha az előadásnak már vannak alkotói, beállítjuk őket
        if (performance?.creatorId) {
          setSelectedCreators(performance.creatorId);
        }
      } catch (error) {
        console.error('Hiba történt az alkotók betöltésekor:', error); // 🔍 Hibakeresés
        toast.error('Hiba történt az alkotók betöltésekor.');
      }
    };

    fetchCreators();
  }, [performance]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('theaterId', values.theaterId);
    formData.append('description', values.description);

    values.creatorId.forEach((creator) => formData.append('creatorIds', creator));

    values.performanceEventId.forEach((performanceEvent) =>
      formData.append('performanceEventIds', performanceEvent),
    );

    if (values.targetAudience) {
      formData.append('targetAudience', values.targetAudience);
    }

    if (values.posterURL instanceof File) {
      formData.append('poster', values.posterURL);
    }

    values.imagesURL.forEach((image) => {
      if (image instanceof File) {
        formData.append('files', image);
      }
    });

    console.log('Küldött adatok:', values);

    try {
      // Összegyűjtjük az összes törlendő képet egy tömbbe
      const allDeletedImages = [...deletedImages];

      if (isPosterDeleted) {
        allDeletedImages.push(performance.posterURL);
      }

      // Ha van mit törölni, akkor küldjük el
      if (allDeletedImages.length > 0) {
        await performancesService.deletePoster(performance.id, allDeletedImages); // 🔥 NE csomagold újra!
      }

      // Performance data update
      const response = await performancesService.update(performance.id, formData);
      if (!response) throw new Error('Hiba történt az előadás módosításakor.');

      toast.success('Előadás sikeresen módosítva!');

      // Ha tervezett előadás be van pipálva, hozzunk létre egy futurePerformances rekordot
      if (values.plannedPerformance) {
        const futurePerformanceData = {
          targetBudgetIdeal: values.targetBudgetIdeal,
          targetBudget: values.targetBudget,
          minimumBudget: values.minimumBudget,
          actualBudget: values.actualBudget,
          gift: values.gift,
          performanceId: performance.id,
        };

        try {
          if (performance?.futurePerformance?.id) {
            // Ha már létezik futurePerformance, akkor frissítjük
            await futurePerformancesService.update(
              performance.futurePerformance.id,
              futurePerformanceData,
            );
            toast.success('Tervezett előadás adatai sikeresen frissítve!');
          } else {
            // Ha nincs, akkor új futurePerformance-t hozunk létre
            await futurePerformancesService.create(futurePerformanceData);
            toast.success('Tervezett előadás adatai sikeresen mentve!');
          }
        } catch (error) {
          toast.error(
            `Hiba történt a tervezett előadás mentése/frissítése során: ${error.message}`,
          );
        }
      }

      setTimeout(() => {
        navigate('/theater-admin');
      }, 1000);
    } catch (error) {
      toast.error(`Hiba történt a módosítás során: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePosterChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('posterURL', file);
    setPosterPreview(URL.createObjectURL(file)); // Frissíti a preview-t az új képre
    setIsPosterDeleted(false); // Ha új képet töltünk fel, akkor ne törölje az adatbázisból az előzőt
  };

  const removePoster = (setFieldValue) => {
    setFieldValue('posterURL', null);
    setPosterPreview(null);
    setIsPosterDeleted(true);
  };

  const handleImagesChange = (event, setFieldValue, images) => {
    const files = Array.from(event.target.files);
    setFieldValue('imagesURL', [...images, ...files]);
    setImagesPreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const removeImage = (index, setFieldValue, images) => {
    const updatedImages = [...images];
    const removedImage = updatedImages.splice(index, 1)[0]; // 🔹 Törölt kép URL-je

    setFieldValue('imagesURL', updatedImages);
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));

    // 🔹 Ha az eltávolított kép már az adatbázisban volt, akkor tárold törlésre
    if (typeof removedImage === 'string') {
      setDeletedImages((prev) => [...prev, removedImage]);
    }
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Deleting a performance
  const handleDeleteSuccess = () => {
    toast.success('Előadás sikeresen törölve!');
    setIsDeleteModalOpen(false);
    navigate('/theater-admin'); // Navigálás vissza az admin oldalra
  };

  // Deletin future performance
  const handlePlannedPerformanceDelete = async (setFieldValue) => {
    if (!performance?.futurePerformance?.id) return;

    try {
      await futurePerformancesService.destroy(performance.futurePerformance.id);
      toast.success('Tervezett előadás sikeresen törölve!');

      // Csak a checkboxot állítjuk false-ra
      setFieldValue('plannedPerformance', false);
    } catch (error) {
      toast.error(`Hiba történt a tervezett előadás törlése során: ${error.message}`);
    }
  };

  return (
    <div className="mx-auto p-12 my-40 bg-c-secondary-light rounded-md">
      <h2 className="font-bold text-gray-800 text-xl mb-6">Előadás módosítása</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            {/* Előadás neve */}
            <div className="mb-4">
              <label htmlFor="title" className="text-gray-800 font-bold">
                Előadás neve
              </label>
              <Field
                type="text"
                name="title"
                placeholder={performance?.title || 'Írd be a színház nevét'}
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Tervezett előadás checkbox */}
            <div className="mb-4 flex items-center">
              <Field
                type="checkbox"
                name="plannedPerformance"
                className="mr-2"
                checked={values.plannedPerformance} // Beállítja az alapértelmezett állapotot
                onChange={(e) => setFieldValue('plannedPerformance', e.target.checked)}
              />
              <label htmlFor="plannedPerformance" className="text-gray-800 font-bold">
                Tervezett előadás
              </label>
            </div>

            {values.plannedPerformance && (
              <div className="mb-4 bg-gray-100 p-4 rounded-md">
                <h3 className="font-bold text-gray-800 mb-2">Tervezett előadás adatai</h3>

                {['targetBudgetIdeal', 'targetBudget', 'minimumBudget', 'actualBudget'].map(
                  (field) => {
                    const labels = {
                      targetBudgetIdeal: 'Ideális költségvetés',
                      targetBudget: 'Cél költségvetés',
                      minimumBudget: 'Minimum költségvetés',
                      actualBudget: 'Aktuális költségvetés',
                    };

                    return (
                      <div key={field} className="mb-4">
                        <label htmlFor={field} className="text-gray-800 font-bold">
                          {labels[field]}
                        </label>
                        <Field
                          type="number"
                          name={field}
                          placeholder={performance?.futurePerformance?.[field] || 'Összeg'}
                          className="w-full border p-2 rounded my-1 text-gray-800"
                        />
                        <ErrorMessage
                          name={field}
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    );
                  },
                )}
                <div className="mb-4">
                  <label htmlFor="theaterId" className="text-gray-800 font-bold">
                    Ajándék az adományozónak
                  </label>
                  <div className="flex items-center">
                    <Field
                      type="text"
                      name="gift"
                      className="w-full border p-2 rounded my-1 text-gray-800 bg-gray-100"
                    />
                  </div>
                  <ErrorMessage name="gift" component="div" className="text-red-500 text-sm" />
                </div>
                <p className="mb-4">Ha bemutattad az előadást, vagy véget ért a gyűjtésed:</p>
                <button
                  type="button"
                  className="ml-2 bg-red-600 text-white px-2 py-1 rounded font-bold hover:bg-red-500 transition duration-150"
                  onClick={() => handlePlannedPerformanceDelete(setFieldValue)}
                >
                  Tervezett előadás kategória Törlése
                </button>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="theaterId" className="text-gray-800 font-bold">
                Színház
              </label>
              <div className="flex items-center">
                <Field
                  type="text"
                  name="theaterId"
                  className="w-full border p-2 rounded my-1 text-gray-800 bg-gray-100"
                  disabled
                />
              </div>
              <ErrorMessage name="theaterId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="targetAudience" className="text-gray-800 font-bold">
                Célközönség (opcionális)
              </label>
              <Field
                as="select"
                name="targetAudience"
                className="w-full border p-2 rounded text-gray-800"
              >
                <option value="">Válassz célközönséget</option>
                {targetAgeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="targetAudience"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="text-gray-800 font-bold">
                Leírás <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Add meg az előadás leírását"
                className="w-full border p-2 rounded my-1 text-gray-800"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="creators" className="text-gray-800 font-bold">
                Alkotók <span className="text-red-500">*</span>
              </label>
              {values.creatorId.map((_, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Field
                    as="select"
                    name={`creatorId[${index}]`}
                    className="w-full border p-2 rounded text-gray-800"
                  >
                    <option value={_.id} key={_.id}>
                      {_.name ? _.name : 'Válassz egy alkotót!'}
                    </option>
                    {creatorOptions.map((creator) => (
                      <option key={creator.id} value={creator.id}>
                        {creator.name}
                      </option>
                    ))}
                  </Field>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedCreators = [...values.creatorId];
                      updatedCreators.splice(index, 1);
                      setFieldValue('creatorId', updatedCreators);
                    }}
                    className="ml-2 bg-red-600 text-white px-2 py-1 rounded font-bold hover:bg-red-500 transition duration-150"
                  >
                    Törlés
                  </button>
                </div>
              ))}
              <div className="flex items-center">
                <DefaultButton
                  text="Új alkotó hozzáadása"
                  type="button"
                  disabled={values.creatorId.some((id) => !id || id === '')}
                  onClick={() => setFieldValue('creatorId', [...values.creatorId, ''])}
                />
              </div>
              <ErrorMessage name="creatorId" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="performanceEvents" className="text-gray-800 font-bold">
                Előadás eseményei <span className="text-red-500">*</span>
              </label>
              <ul className="mt-2">
                {selectedPerformanceEvents.length > 0 ? (
                  selectedPerformanceEvents.map((_, index) => (
                    <li
                      key={_.id}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
                    >
                      <span className="text-gray-800">
                        {formatDate(_.performanceDate) || 'Névtelen esemény'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedEvents = [...selectedPerformanceEvents];
                          updatedEvents.splice(index, 1);
                          setSelectedPerformanceEvents(updatedEvents);
                          setFieldValue(
                            'performanceEventId',
                            updatedEvents.map((e) => e.id),
                          );
                        }}
                        className="ml-2 bg-red-600 text-white px-2 py-1 rounded font-bold hover:bg-red-500 transition duration-150"
                      >
                        Törlés
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Nincs hozzáadott esemény</li>
                )}
              </ul>
              <ErrorMessage
                name="performanceEventId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4 mt-4 flex justify-center">
              <DefaultButton
                text="Új előadás időpont hozzáadása"
                type="button"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="posterURL" className="text-gray-800 font-bold block mb-2">
                Poszter
              </label>
              <DefaultButton
                text="Fájl kiválasztása"
                type="button"
                onClick={() => document.getElementById('posterURL').click()}
              />
              <input
                type="file"
                id="posterURL"
                accept="image/*"
                onChange={(e) => handlePosterChange(e, setFieldValue)}
                className="hidden"
              />
              {posterPreview && (
                <div className="my-2 relative">
                  <img
                    src={posterPreview}
                    alt="Poster preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removePoster(setFieldValue)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              )}
              <ErrorMessage name="posterURL" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label htmlFor="imagesURL" className="text-gray-800 font-bold block mb-2">
                További képek
              </label>
              <DefaultButton
                text="Fájlok kiválasztása"
                type="button"
                onClick={() => document.getElementById('imagesURL').click()}
              />
              <input
                type="file"
                id="imagesURL"
                accept="image/*"
                multiple
                onChange={(e) => handleImagesChange(e, setFieldValue, values.imagesURL)}
                className="hidden"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {imagesPreview.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index, setFieldValue, values.imagesURL)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gombok */}
            <div className="flex justify-between gap-10">
              <DefaultButton text="Előadás módosítása" type="submit" />
              <DefaultButton text="Mégsem" type="button" onClick={handleBack} />
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-5 p-2 flex justify-center">
        <button
          type="button"
          className="ml-2 bg-red-600 text-white px-20 py-3 rounded font-bold hover:bg-red-500 transition duration-150"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Előadás törlése
        </button>
      </div>

      {isModalOpen && (
        <AddPerformanceEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          performanceId={performance.id}
          onEventAdded={(newEvent) => {
            console.log('Új esemény hozzáadva:', newEvent);
          }}
        />
      )}

      {/* Törlési Modal */}
      <PerformanceDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        performanceId={performance.id}
        title={performance.title}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
