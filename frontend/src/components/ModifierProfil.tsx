import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';

const ModifierProfil: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('proxidev@mail.com');
  const [phone, setPhone] = useState('+237657680018');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
    newPassword: false,
    confirmPassword: false,
    currentPassword: false,
  });

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, maxChar: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length <= maxChar) {
      setter(e.target.value);
    }
  };

  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^\+2376\d{8}$/.test(phone);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate each field and update formErrors accordingly
    const errors = {
      name: !name,
      email: !validateEmail(email),
      phone: !validatePhone(phone),
      newPassword: newPassword.length === 0 || newPassword.length < 8,
      confirmPassword: confirmPassword.length === 0 || confirmPassword !== newPassword,
      currentPassword: currentPassword.length === 0 || currentPassword.length < 8,
    };

    setFormErrors(errors);

    // If there are any errors, prevent form submission
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    // Proceed with form submission logic here
    console.log('Form submitted successfully!');
  };

  return (
    <div className="p-4 pt-2 w-full">
      <header className="mb-4 mt-2 flex items-center space-x-4">
        <img src="src/assets/pp.jpg" alt="Profile" className="h-12 w-12 rounded-full" />
        <h2 className="font-bold text-lg">Modifier le Profil</h2>
      </header>
      <hr className='w-full mb-4' />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Modifier mes Informations</h3>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.name ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <AiOutlineUser />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Votre Nom</label>
              <input
                placeholder="Proxi dev"
                value={name}
                onChange={handleInputChange(setName, 20)}
                className={`h-10 w-full border-b ${formErrors.name ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
                maxLength={20}
              />
              <div className="absolute right-0 bottom-[-20px] text-sm text-white bg-green-500 px-1 rounded">
                {name.length}/20
              </div>
            </div>
          </div>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.email ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <AiOutlineMail />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Votre Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-10 w-full border-b ${formErrors.email ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
              />
            </div>
          </div>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.phone ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <AiOutlinePhone />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Votre Téléphone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`h-10 w-full border-b ${formErrors.phone ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Modifier mon Mot de Passe</h3>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.newPassword ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <FiLock />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Nouveau Mot de Passe</label>
              <div className="relative">
                <input
                  placeholder="Nouveau Mot de Passe"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={handleInputChange(setNewPassword, 12)}
                  onBlur={() => setShowNewPassword(false)}
                  className={`h-10 w-full border-b ${formErrors.newPassword ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
                  maxLength={12}
                />
                {newPassword && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={toggleNewPassword}
                  >
                    {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                )}
              </div>
              <div className="absolute right-0 bottom-[-20px] text-sm text-white bg-green-500 px-1 rounded">
                {newPassword.length}/12
              </div>
            </div>
          </div>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.confirmPassword ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <FiLock />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Confirmer le Nouveau Mot de Passe</label>
              <div className="relative">
                <input
                  placeholder="Confirmation du mot de passe"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword, 12)}
                  onBlur={() => setShowConfirmPassword(false)}
                  className={`h-10 w-full border-b ${formErrors.confirmPassword ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
                  maxLength={12}
                />
                {confirmPassword && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                )}
              </div>
              <div className="absolute right-0 bottom-[-20px] text-sm text-white bg-green-500 px-1 rounded">
                {confirmPassword.length}/12
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Valider les modifications</h3>
          <div className={`relative mb-4 flex items-center justify-center ${formErrors.currentPassword ? 'border-red-500' : ''}`}>
            <div className="absolute left-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex justify-center items-center">
                <FiLock />
              </div>
            </div>
            <div className="w-full pl-12 relative">
              <label className="block text-sm text-gray-500 mb-0.5">Mot de passe Actuel</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Mot de passe actuel"
                  value={currentPassword}
                  onChange={handleInputChange(setCurrentPassword, 12)}
                  onBlur={() => setShowCurrentPassword(false)}
                  className={`h-10 w-full border-b ${formErrors.currentPassword ? 'border-red-500' : 'border-black'} bg-transparent pt-1 pb-1.5 text-sm text-blue-gray-700 outline-none focus:border-green-500 focus:shadow-lg invalid:border-red-500`}
                  maxLength={12}
                />
                {currentPassword && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={toggleCurrentPassword}
                  >
                    {showCurrentPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                )}
              </div>
              <div className="absolute right-0 bottom-[-20px] text-sm text-white bg-green-500 px-1 rounded">
                {currentPassword.length}/12
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full p-3 bg-black text-white rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default ModifierProfil;
