import React from 'react';

function Profile() {
  return (
    <div className="m-6 flex items-center flex-col w-[24rem]">
      <img src="https://uludag.edu.tr/img/uu.svg" className="w-20 " alt="" />
      <ul className="mt-6">
        <li className="w-[24rem] flex justify-between p-3 border-b-2">
          <b>Ad</b>
          <span>Murat</span>
        </li>
        <li className="w-[24rem] flex justify-between p-3 border-b-2">
          <b>Soyad</b>
          <span>İlhan</span>
        </li>
        <li className="w-[24rem] flex justify-between p-3 border-b-2">
          <b>Okul No</b>
          <span>0222 222 22</span>
        </li>
        <li className="w-[24rem] flex justify-between p-3 border-b-2">
          <b>Bölüm</b>
          <span>Bilgisayar</span>
        </li>

        <li className="w-[24rem] flex justify-between p-3 border-b-2">
          <b>Üniversite</b>
          <span>Uludağ Üni.</span>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
