import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const doctorSchema = Joi.object({
  name: "x",
  middlename: "z",
  surname: "z",
  titles: Joi.array().items(Joi.string().required()).required(),
  hospitalId: Joi.number().required(),
  imageSrc: Joi.string().uri().required(),
  speciality: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().email(),
});

const typeObject = {
  login: loginSchema,
  doctor: doctorSchema,
};

export const validateForm = (type) => {
  const schema = typeObject[type];
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (err) {
      return res.status(201).json({ err: true });
    }
  };
};
