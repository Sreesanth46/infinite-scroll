interface IMessageProp {
  message: string;
  sender: string;
}

export default function Message(props: Readonly<IMessageProp>) {
  const { message, sender } = props;

  return (
    <div className="flex items-center gap-2">
      <div className="w-[30px] h-[30px] rounded-full flex bg-green-200 justify-center items-center">
        {sender.charAt(0)}
      </div>
      <p className="bg-green-200  rounded-md px-2 ">{message}</p>
    </div>
  );
}
