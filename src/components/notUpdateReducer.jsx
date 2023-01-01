import React, { useState, useReducer, useContext, createContext } from "react";
import { SelectItemAndChilds, FunctionFinderContext } from "./context";
import Item from "./Item";
import Tabel from "./tabel";
const Data = [
  {
    name: "a name",
    id: "id1",
    childeren: [
      { name: "aa name", id: "id211", childeren: [] },
      { name: "aaa name", id: "id113221", childeren: [] },
    ],
  },
  {
    name: "b name",
    id: "id2",
    childeren: [
      { name: "bb name", id: "id22", childeren: [] },
      { name: "bbb name", id: "id222", childeren: [] },
    ],
  },
  {
    name: "c name",
    id: "id3",
    childeren: [
      { name: "cc name", id: "id33", childeren: [] },
      { name: "ccc name", id: "id333", childeren: [] },
      { name: "cccc name", id: "3333", childeren: [] },
    ],
  },
];

const SetTabelDataReducer = (state, acction) => {
  switch (acction.type) {
    case "SetTabelData":
      return acction.payload;
    default:
      return state;
  }
};

const RefactorContext = () => {
  const [ItemsAccardon, setItemsAccardon] = useState([
    { title: "1 title", data: Data },
    { title: "2 title", data: Data },
    { title: "3 title", data: Data },
  ]);

  const [Tabeldata, dispatchTabeldata] = useReducer(SetTabelDataReducer, []);

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SelectItemAndChilds.Provider value={[Tabeldata, dispatchTabeldata]}>
        <div style={{width:'30%'}}>
          <h3>This data list accardon</h3>

          {ItemsAccardon.map((value, index) => {
            return (
              <Accardon title={value.title} item={value.data} key={index} />
            );
          })}
        </div>

      
      <Tabel />
      
      </SelectItemAndChilds.Provider>
    </div>
  );
};

export default RefactorContext;

function Additem(data, id) {
  let updated = false;
  const map = (item) => {
    if (updated) return item;

    if (item.id === id) {
      updated = true;
      return {
        ...item,
        childeren: [
          ...item.childeren,
          {
            name: `xItems ${Math.floor(Math.random() * 4343)}`,
            id: Math.floor(Math.random() * 7323).toString(),
            childeren: [],
          },
        ],
      }; // add new item
    }

    if (item.childeren)
      return {
        ...item,
        childeren: item.childeren.map(map),
      };
  };

  return data.map(map);
}

const Reducer = (state, action) => {
  switch (action.type) {
    case "Addchilds":
      const AddItemResult = Additem(state, accardon.payload);
      return AddItemResult;
    default:
      return state;
  }
};

function Accardon({ item, title }) {
  const [Tabeldata, dispatchTabeldata] = useContext(SelectItemAndChilds);
  const [stateDataitem, dispatchDataitem] = useReducer(Reducer, item);
 
  const FindDataWhitid = (data) => {
    dispatchTabeldata({ type: "SetTabelData", payload: data });
  };

  const AddItemsChilds = (id) => {
    dispatchDataitem({ type: "Addchilds", payload: id });
    FindDataWhitid(stateDataitem)
  };
  return (
    <div
      style={{
        background: "aquamarine",
        border: "2px solid red",
        marginTop: "20px",
        width: "100%",
      }}
    >
      <h3>this: {title}</h3>
      <FunctionFinderContext.Provider value={[FindDataWhitid, AddItemsChilds]}>
        {stateDataitem.map((value, index) => {
          return (
            <>
              <Item data={value} key={index} />
            </>
          );
        })}
      </FunctionFinderContext.Provider>
    </div>
  );
}
