const user = {
  name: "fay-test",
  phone: "15295669181"
};

export const getUser = () => new Promise((resolve) => {
  resolve(user);
});
