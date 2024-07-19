import React from 'react';
import './Profil.css';

const InfoProfil: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h6 className="text-xl font-bold mb-4 text-gray-700">Infos Profil</h6>
        <div className="flex items-center space-x-4">
          <img src="src/assets/pp.jpg" alt="" className="h-16 w-16 rounded-full border-2 border-gray-300" />
          <div className="text-gray-600">
            <p className="font-semibold text-lg">Proxi Dev</p>
            <p className="text-sm">+237 657 680 018</p>
            <p className="text-sm">proxidev@mail.com</p>
          </div>
        </div>
      </div>
      <div className="profile-menu space-y-4">
        <a href="#" className="flex items-center space-x-3 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
            alt="Modifier Profil"
            className="w-6 h-6"
          />
          <span className="text-gray-700">Modifier Profil</span>
        </a>
        <a href="#" id='deconnexion' className="flex items-center space-x-3 px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/logout-rounded-left.png"
            alt="Déconnexion"
            className="w-6 h-6"
          />
          <span className="text-gray-700">Déconnexion</span>
        </a>
      </div>
    </div>
  );
}

export default InfoProfil;
