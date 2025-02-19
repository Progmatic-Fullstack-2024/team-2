import { useState } from 'react';

import bookingService from '../../services/booking.service';
import DefaultButton from '../misc/DefaultButton.jsx';

export default function QRCodePresenterForSeatsList({ ticket, qrCancel, id }) {
  const [resultMsg, setResultMsg] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const downloadQrCode = () => {
    const qrelement = document.createElement('a');
    qrelement.href = ticket.qrImage;
    qrelement.download = 'QRkod.png';
    qrelement.click();
  };

  const sendQrCodeMail = async () => {
    const data = {
      userId: id,
      theater: ticket.theater,
      title: ticket.title,
      date: ticket.date,
      time: ticket.time,
      qrimage: ticket.qrImage,
    };
    try {
      const result = await bookingService.sendQrCodeMail(data);
      if (result.result && result.result === 'ok')
        setResultMsg('E mail a QR kóddal sikeresen elküldve');
      else setResultMsg('hiba az E-mail küldés sikertelen!');
    } catch (e) {
      setResultMsg('hiba az E-mail küldés meghiúsult!');
    }
    setResultModal(true);
  };

  const cancalResult = () => {
    setResultModal(false);
    setResultMsg('');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-auto flex flex-col bg-c-primary z-50 text-white rounded">
      <h1 className="text-center text-2xl font-bold">Helyfoglalás</h1>
      <div className="flex flex-col tablet:flex-row gap-5 tablet:justify-between">
        <table className=" m-5 px-2">
          <tbody>
            <tr>
              <td className="pr-2">Színház neve:</td>
              <td>{ticket.theater}</td>
            </tr>
            <tr>
              <td className="pr-2">előadás:</td>
              <td>{ticket.title}</td>
            </tr>
            <tr>
              <td className="pr-2">Dátum:</td>
              <td>{ticket.date}</td>
            </tr>
            <tr>
              <td className="pr-2">kezdési idő:</td>
              <td>{ticket.time}</td>
            </tr>
            <tr>
              <td className="pr-2">jegyek száms:</td>
              <td>{ticket.seats}</td>
            </tr>
          </tbody>
        </table>
        <div className="m-5">
          <img src={ticket.qrImage} alt="qr kód" />
        </div>
      </div>
      <div className="flex flex-col tablet:flex-row gap-5 p-5 tablet:justify-between">
        <DefaultButton
          text="QR kód Letöltése"
          color="c-secondary-dark"
          textColor="gray-900"
          onClick={downloadQrCode}
          disabled={resultModal}
        />
        <DefaultButton
          text="Küldés E-mailben"
          color="c-secondary-dark"
          textColor="gray-900"
          onClick={sendQrCodeMail}
          disabled={resultModal}
        />
        <DefaultButton
          text="Vissza"
          color="c-secondary-dark"
          textColor="gray-900"
          onClick={qrCancel}
          disabled={resultModal}
        />
      </div>
      {resultModal && (
        <div className="absolute top-10 left-20 bg-c-secondary-dark z-60 p-10 text-gray-900">
          <h2>{resultMsg}</h2>
          <div className="w-fit mx-auto mt-5">
            <DefaultButton text="vissza" type="button" onClick={cancalResult} color="c-primary" />
          </div>
        </div>
      )}
    </div>
  );
}
