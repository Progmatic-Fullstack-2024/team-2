
import DefaultButton from './misc/DefaultButton';

export default function NewPasswordResult({ visilable = false, msg, callBack = () => {} }) {
  const handler = () => {
    callBack();
  };

  if (!visilable) return null;

    return (
      <div className="absolute top-0 left-0 backdrop-blur-sm w-full h-full flex items-center justify-center bg-c-background/20 z-50">
        <div className="flex flex-col bg-c-secondary gap-2 p-2 rounded items-center">
          <h2 className="p-5 ">{msg}</h2>

          <DefaultButton text="vissza" type="button" onClick={handler} width="1/2" />
        </div>
      </div>
    );
}
