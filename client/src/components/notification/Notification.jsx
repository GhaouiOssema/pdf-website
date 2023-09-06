import React from "react";

const Notification = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start justify-center min-h-screen bg-gradient-to-t p-6">
        <div className="w-full">
          <div className="grid grid-cols-1 h-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 2, 1, 12, 2, 1].map(
              (el, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 px-4 bg-white rounded-md mt-5"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                      className="rounded-full h-14 w-14"
                      alt=""
                    />
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold">Leonard Krashner</span>
                      <span className="text-sm">
                        Yeah same question here too 🔥
                      </span>
                    </div>
                  </div>
                  <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
                    17m ago
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
