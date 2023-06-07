class Doctor {
  constructor(
    titles,
    name,
    middlename,
    surname,
    phone,
    city,
    speciality,
    email,
    titleIds,
    imageSrc
  ) {
    this.titlesl = titles;
    this.name = name;
    this.middlename = middlename;
    this.surname = surname;
    this.phone = phone;
    this.city = city;
    this.speciality = speciality;
    this.email = email;
    this.doctorTitles = titleIds;
    this.imageSrc = imageSrc;
    this.addRating();
  }

  addRating() {
    const randomRating = Math.random() * 5;
    this.rating = +randomRating.toFixed(1);
  }
}

export default Doctor;
