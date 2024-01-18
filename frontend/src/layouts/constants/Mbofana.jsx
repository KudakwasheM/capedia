"use client";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import max_api from "../../../nodejs";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { useForm } from "react-hook-form";

interface profileInterface {
  artistName: string;
  artistAge: number;
  artistAbout: string;
  artistImage: { profilePic: string };
  genre: [];
}

const ProfileTemplate: profileInterface = {
  artistName: "",
  artistAge: 0,
  artistAbout: "",
  artistImage: { profilePic: "" },
  genre: [],
};

export default function Music() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const [genre, setGenre] = useState("");

  const [genreName, setGenreNames] = useState<any>([]);
  const addID = () => {
    // e.preventDefault();
    console.log("EnAjGK5CQs8");
    const idInput = document.getElementById("genre_text") as HTMLInputElement;

    if (!genreName.includes(genre)) {
      setGenreNames([...genreName, genre]);
    }
    idInput.value = "";
    console.log(genreName);
  };

  const [creatingProfile, setProfile] = useState(false);

  const showModal = () => {
    const modalElement = document.getElementById(
      "profile-modal"
    ) as HTMLDivElement;

    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900 bg-opacity-50 inset-0 z-30",
      closable: true,
      onHide: () => {
        console.log("modal is hidden");
      },
      onShow: () => {
        console.log("modal is shown");
      },
      onToggle: () => {
        console.log("modal has been toggled");
      },
    };

    const modal: ModalInterface = new Modal(modalElement, modalOptions);

    modal.show();
  };

  const closeProfileModal = () => {
    const modalElement = document.getElementById(
      "profile-modal"
    ) as HTMLDivElement;

    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900 bg-opacity-50 inset-0 z-30",
      closable: true,
      onHide: () => {
        console.log("modal is hidden");
      },
      onShow: () => {
        console.log("modal is shown");
      },
      onToggle: () => {
        console.log("modal has been toggled");
      },
    };

    const modal: ModalInterface = new Modal(modalElement, modalOptions);

    modal.hide();
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [artistImage, setArtistImage] = useState<any>({});

  const [profilePic, setPPic] = useState("");

  const handleFile = async (e: ChangeEvent<any>) => {
    const files = e.target.files[0];
    const base64 = await convertToBase64(files);
    // console.log(base64);
    setArtistImage({ ...artistImage, profilePic: base64 });
  };

  const createProfile = () => {
    setProfile(true);
    try {
      formData.artistImage = artistImage;
      formData.artist_genre = genreName;
      formData.userID = "64d9bb8afa99abeed3b2e8be";

      let config = {
        method: "post",
        url: `${max_api}artist_profile`,
        data: formData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response);
          setPPic(response.data.profile);
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(() => {
        setProfile(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const [profileData, setData] = useState<profileInterface>(ProfileTemplate);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const user_id = localStorage.getItem("user_id");
    // }
    try {
      axios
        .get(`${max_api}get_artist_profile?user_id=6537d1d57d2934e61b07d0d9`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("object");
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <main>
      <div className="relative flex flex-col justify-between overflow-y-auto">
        <div className="mt-[10vh]">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-col gap-2">
              <img
                src={profileData?.artistImage.profilePic}
                alt="profile"
                className="m-auto rounded-full h-[15vh] w-[15vh] border-gray-200 border-2"
              />

              <button
                className="flex flex-row justify-center gap-2"
                onClick={showModal}
              >
                <h4 className="mt-1">Edit My Profile</h4>
                <EditIcon />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2 p-2">
              {/* card 1 */}

              <div className="w-full p-4 text-start bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  About
                </h5>
                <p className="text-gray-600">{profileData?.artistAbout}</p>
              </div>

              {/* card 2 */}
              <div className="w-full p-4 text-start bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Personal Details
                </h5>
                <h3 className="text-gray-600">
                  Name: {profileData?.artistName}
                </h3>
                <h3 className="text-gray-600">Age: {profileData?.artistAge}</h3>
              </div>
              {/* card 3 */}
              <div className="w-full p-4 text-start bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Genre(s)
                </h5>

                <div className="flex flex-wrap gap-2">
                  {profileData?.genre.map((genre) => {
                    return (
                      <>
                        <span
                          id="badge-dismiss-dark"
                          className="inline-flex items-center h-[5vh] px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-xl dark:bg-gray-700 dark:text-gray-300"
                        >
                          {genre}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}

      <div
        id="profile-modal"
        tab-index="-1"
        aria-hidden="true"
        className="absolute justify-center z-[] hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={closeProfileModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Profile Details
              </h3>

              <form
                className="space-y-6"
                onSubmit={handleSubmit(createProfile)}
              >
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Artist Name
                  </label>
                  <input
                    type="text"
                    id="amount"
                    placeholder="Michael Smith"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("artist_name", { required: false })}
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    placeholder="20"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("artist_age", { required: false })}
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About
                  </label>
                  <textarea
                    id="amount"
                    placeholder="who are you?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("about", { required: false })}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Genre
                  </label>
                  <div className="flex flex-row gap-2">
                    <input
                      type="text"
                      id="genre_text"
                      placeholder="sungura"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      {...register("artist_genre", {
                        required: false,
                        onChange: (e) => setGenre(e.target.value),
                      })}
                    ></input>
                    <button
                      type="button"
                      onClick={() => addID()}
                      className="text-white bg-slate-500 w-full hover:bg-yeshua-blue  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Pofile
                  </label>
                  <input
                    type="file"
                    id="amount"
                    placeholder="Inspiration"
                    // accept=".jpeg, .png, .jpg"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    {...register("profile_picture", {
                      required: false,
                      onChange: (e) => handleFile(e),
                    })}
                  ></input>
                </div>
                {genreName.length > 0 ? (
                  <div className="flex flex-row h-[15vh] overflow-y-auto gap-2 flex-wrap justify-center">
                    {genreName.map((id: string) => {
                      return (
                        <>
                          <span
                            id="badge-dismiss-dark"
                            className="inline-flex items-center h-[5vh] px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {id}
                            <button
                              type="button"
                              className="inline-flex items-center p-1 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
                              data-dismiss-target="#badge-dismiss-dark"
                              aria-label="Remove"
                            >
                              <svg
                                className="w-2 h-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Remove ID</span>
                            </button>
                          </span>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-slate-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {creatingProfile == true ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                      ...saving changes
                    </>
                  ) : (
                    "Save Change"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* modal ends */}
    </main>
  );
}