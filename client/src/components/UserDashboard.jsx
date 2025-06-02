import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import Header from "../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnBooks, setTotalReturnBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned);
    const returned = userBorrowedBooks.filter((book) => book.returned);
    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnBooks(returned.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 min-h-screen overflow-x-hidden">
        <Header />
        <div className="flex flex-col-reverse xl:flex-row gap-8">
          {/* Left side */}
          <div className="flex-[4] flex flex-col gap-7">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-7">
                {/* Borrowed */}
                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-lg shadow hover:shadow-inner transition duration-300">
                  <span className="w-[2px] bg-black h-20" />
                  <span className="bg-gray-300 h-20 w-20 flex justify-center items-center rounded-lg">
                    <img src={bookIcon} alt="borrowed" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Borrowed Book List</p>
                </div>

                {/* Returned */}
                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-lg shadow hover:shadow-inner transition duration-300">
                  <span className="w-[2px] bg-black h-20" />
                  <span className="bg-gray-300 h-20 w-20 flex justify-center items-center rounded-lg">
                    <img src={returnIcon} alt="returned" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Returned Book List</p>
                </div>
              </div>

              {/* Browse Section */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-7">
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] rounded-lg shadow hover:shadow-inner transition duration-300 flex-1">
                  <span className="w-[2px] bg-black h-20" />
                  <span className="bg-gray-300 h-20 w-20 flex justify-center items-center rounded-lg">
                    <img src={browseIcon} alt="browse" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Let's browse books inventory</p>
                </div>
                <img
                  src={logo_with_title}
                  alt="logo"
                  className="hidden lg:block w-auto h-20 object-contain"
                />
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex justify-center items-center rounded-2xl">
              <h4 className="text-center">
                "Embarking on the journey of reading fosters personal growth,
                nurturing a path towards excellence and the refinement of character."
              </h4>
              <p className="text-gray-700 text-sm sm:text-lg absolute right-8 bottom-2">
                ~ BookWorm Team
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-[2] flex flex-col gap-10 xl:gap-20 py-5 items-center justify-between">
            <div className="w-full">
              <Pie data={data} options={{ cutout: 0 }} className="w-full h-auto" />
            </div>

            <div className="flex items-center p-6 sm:p-8 w-full xl:w-fit gap-5 bg-white rounded-lg shadow">
              <img src={logo} alt="logo" className="h-12 2xl:h-20 w-auto" />
              <span className="w-[2px] bg-black h-full" />
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#3D3E3E]" />
                  <span>Total Borrowed Books</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#151619]" />
                  <span>Total Returned Books</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
