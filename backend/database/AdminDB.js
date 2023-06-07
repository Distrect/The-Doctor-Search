import db from "../src/models/index.js";
const { Admin } = db;

class AdminDB {
  login = async (obj) => {
    const { email, password } = obj;

    return await Admin.findOne({
      where: {
        email,
      },
    })
      .then((res) => {
        const { password: resPass } = res;

        if (res === null) {
          throw new Error("Account not found");
        }

        if (password === resPass) {
          return res;
        } else {
          throw new Error("Password is wrong");
        }
      })
      .catch((err) => {
        throw err;
      });
  };
}

const AdminModel = new AdminDB();

export default AdminModel;
