export default () => {
  self.onmessage = (message: any) => {
    const { file } = message.data;
    console.log(file);
  };
};
