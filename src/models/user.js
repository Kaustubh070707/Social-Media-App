const validator = require("validator");

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLenght: 4,
      maxLength: 255,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a Strong Password");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgQDBQYBB//EADIQAAICAQIEAwYEBwAAAAAAAAABAgMRBCEFEjFBE1FxIjJCUqHBFCNhkTM0YnKBsdH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+qgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGVtcfeshH1kgJAjGyE/dnF+jJAAAAAAAAAAAAAAAAAAAAKWt4hXp24QSss8uy9Tzims8CHhVv8ANks5Xwo0nfIGa7V3Xt89ksfKnhGHCAAYXkWKNdfQ9rHKPyyeUVwBv9Hra9UsJctiW8X9i0ctFuMlJPDW6aN/w/Vfiafa/iR2l/0C0AAAAAAAAAAAAACTSi29kllsFfiMuXRXP+nH77AaG6132ytfWTz6EAgAAAAAADPornRqq559lvll6MwBgdSCFMuemuXzRT+hMAAAAAAhCXZkzASjPGzAygJpgAVuJRctDal1xn6lk8nGM4SjLpJYYHLoErK5VWShPrF4IgAAAAAAMGbR1ePqq6+2cy9F1A6DTpx09UX1UEvoTAAABtLqAIynjoRlNsgAAAHuScZ9mYwBmUkz0wElNruBS4rpHYvHrjmUV7SXdeZqDpvE23WTWa/SUtuddkKpvdxk8JgawHmVlrbYZA9B5k9j7UkspZ7t4QDrsje8M0j09fPYvzJ9V5LyMXD9LRU/Ec4W2Lo10j6F52eSAmG0u5ic2yIGR2eRBvPU8AAAAAAAAAHpU1WvqobjnmmvhX3Kmu4g55r07xHvNd/Q1wFm7Xai7OZ8i+WOxW6gAAAAAABNreLw/NFujiF9WFKXiR783X9yoAN9ptZVqNoNqfeMupYOZy0008NdDa6DX87VWoeJPaM339f1A2IAAAAAAABrOKavrp63t8b+xd1d34fTys2z0iv1Ofbb3bbb6tgAAAAAAAAAAAAAAAAbjhmr8WPg2PM4rZ/Mi8c3XZKucZwe8XlHQ02K2qNkfdksgTAAAAAanjFmbYVLpFZfqzXmfWy59Xa32lhf42MAAAAAAAAAAAAAAAAAA2vBrc1zqfwvmRqi5wqWNYl80WvuBugAAAAHN3PN1jfVzf8AsiAAAAAAAAAAAAAAAAAALHD/AOdp/u+zAA3wAA//2Q==",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
