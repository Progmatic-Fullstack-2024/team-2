import { useEffect, useState } from 'react';

import userHandle from '../../services/userhandle.service.js';

export default function UserMenu({ func }) {
  const [lastNameChecked, setLastNameChecked] = useState(true);
  const [firstNameChecked, setFirstNameChecked] = useState(true);
  const [emailChecked, setEmialChecked] = useState(true);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [pageSize, setPageSize] = useState(Infinity);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isPage, setIsPage] = useState(false);

  const buttonClass = 'bg-c-primary-light px-1 mx-1';

  const getSearchText = () => {
    let searchText = null;
    if (lastNameChecked || firstNameChecked || emailChecked || phoneChecked) {
      const searchField = [];
      if (lastNameChecked) searchField.push('lastName');
      if (firstNameChecked) searchField.push('firstName');
      if (emailChecked) searchField.push('email');
      if (phoneChecked) searchField.push('phone');
      searchText = `search=${searchValue}&field=${searchField.join(',')}`;
    }
    return searchText;
  };

  const pagination = async (params) => {
    const count = await userHandle.countUsers(params);
    let newParam = '';
    let size = 0;
    if (count) size = count.numberOfUsers;
    if (pageSize < size) {
      newParam = `page=${page}&limit=${pageSize}`;
      setIsPage(true);
      const lastPage = Math.ceil(size / pageSize);
      setMaxPage(lastPage);
    } else {
      setIsPage(false);
      setMaxPage(1);
    }
    return newParam;
  };

  const changeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const reLoadPage = async () => {
    let searchParam = '';
    let param = '';
    if (searchValue !== '') searchParam = getSearchText();
    param += searchParam;
    if (filter !== 'all') {
      if (param !== '') param += `&`;
      param = `filter=${filter}`;
    }
    const paginationParam = await pagination(param);
    param += param !== '' ? '&' : '';
    param += paginationParam;
    func(param);
  };

  const inputHandler = async (event) => {
    if (event.target.name === 'filter') {
      setFilter(event.target.value);
    } else {
      switch (event.target.name) {
        case 'lastName':
          setLastNameChecked(!lastNameChecked);
          break;
        case 'firstName':
          setFirstNameChecked(!firstNameChecked);
          break;
        case 'email':
          setEmialChecked(!emailChecked);
          break;
        case 'phone':
          setPhoneChecked(!phoneChecked);
          break;
        default:
      }
    }
  };

  const changePageSize = async (event) => {
    setPageSize(Number(event.target.value));
    if (event.target.value === 'Infinity') setIsPage(false);
    else setIsPage(true);
  };

  const pageHandler = (event) => {
    const newPage = Number(event.target.value);
    if (!Number.isNaN(newPage) && newPage <= maxPage && newPage >= 1) setPage(newPage);
  };

  const pageMinus = () => {
    const newPage = page > 1 ? page - 1 : 1;
    setPage(newPage);
  };

  const pagePlus = () => {
    const newPage = page < maxPage ? page + 1 : maxPage;
    setPage(newPage);
  };

  useEffect(() => {
    reLoadPage();
  });

  return (
    <form className=" w-full p-2  bg-c-secondary rounded-md place-content-between">
      <div className="flex flex-col gap-2 flex-1 tablet:flex-row items-center justify-between">
        <div className="border flex p-2 border-gray-500 items-center w-full tablet:w-auto">
          <div className="flex flex-row max-h-10 w-1/2 flex-1 tablet:w-fit">
            <input
              name="userSearch"
              className="outline-none block w-full h-9 ps-12 text-sm text-gray-900 border border-gray-400 rounded-xl outline:0 focus:ring-1 ring-c-primary  "
              placeholder="Felhasználó keresése..."
              value={searchValue}
              onChange={changeSearchValue}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastNameSearch">
              <input
                type="checkbox"
                id="lastNameSearch"
                name="lastName"
                onChange={inputHandler}
                checked={lastNameChecked}
                className="mx-2"
              />
              Vezetéknév
            </label>
            <label htmlFor="firstNameSearch">
              <input
                type="checkbox"
                id="firstNameSearch"
                name="firstName"
                onChange={inputHandler}
                checked={firstNameChecked}
                className="mx-2"
              />
              keresztnév
            </label>
            <label htmlFor="emailSearch">
              <input
                type="checkbox"
                id="emailSearch"
                name="email"
                onChange={inputHandler}
                checked={emailChecked}
                className="mx-2"
              />
              E-mail
            </label>
            <label htmlFor="phoneSearch">
              <input
                type="checkbox"
                id="phoneSearch"
                name="phone"
                onChange={inputHandler}
                checked={phoneChecked}
                className="mx-2"
              />
              telefonszám
            </label>
          </div>
        </div>
        <div className="border flex p-2 border-gray-500 w-full tablet:w-auto ">
          <h3>Szűrés</h3>
          <div className="flex flex-col">
            <label htmlFor="all">
              <input
                type="radio"
                name="filter"
                id="all"
                value="all"
                onChange={inputHandler}
                checked={filter === 'all'}
                className="mx-2"
              />
              Mindenki
            </label>
            <label htmlFor="user">
              <input
                type="radio"
                name="filter"
                id="user"
                value="user"
                onChange={inputHandler}
                checked={filter === 'user'}
                className="mx-2"
              />
              Csak a fehasználók
            </label>
            <label htmlFor="admin">
              <input
                type="radio"
                name="filter"
                id="admin"
                value="admin"
                onChange={inputHandler}
                checked={filter === 'admin'}
                className="mx-2"
              />
              Csak a főadminisztrátorok
            </label>
            <label htmlFor="theaterAdmin">
              <input
                type="radio"
                name="filter"
                id="theaterAdmin"
                value="theaterAdmin"
                onChange={inputHandler}
                checked={filter === 'theaterAdmin'}
                className="mx-2"
              />
              Csak a színház Adimisztrátorok
            </label>
          </div>
        </div>
      </div>
      <div className=" mt-2 p-2 border border-gray-500 bg-c-primary">
        Lapméret:
        <select name="" id="pagesize" onChange={changePageSize} selected={pageSize} className="m-1">
          <option value="Infinity">összes</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        {isPage && (
          <span>
            <button type="button" onClick={pageMinus} className={buttonClass}>
              {String.fromCharCode(9665)}
            </button>
            <input
              type="decimal"
              name="page"
              value={page}
              onChange={pageHandler}
              className="w-5 m-1"
            />
            <button type="button" onClick={pagePlus} className={buttonClass}>
              {String.fromCharCode(9655)}
            </button>
            oldalak száma: {maxPage}
          </span>
        )}
      </div>
    </form>
  );
}
