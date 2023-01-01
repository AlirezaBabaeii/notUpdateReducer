import React, { useState, useReducer, useContext , useCallback } from "react";
import { SelectItemAndChilds, FunctionFinderContext } from "./context";
import Item from "./Item";
import Tabel from "./tabel";
const Data1 = [
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

const Data2 = [
  {
    name: "a name",
    id: "fdsif",
    childeren: [
      { name: "aa name", id: "dfgfdgc", childeren: [] },
      { name: "aaa name", id: "tr643", childeren: [] },
    ],
  },
  {
    name: "b name",
    id: "hjkjvn",
    childeren: [
      { name: "bb name", id: "37hsdgf", childeren: [] },
      { name: "bbb name", id: "bssod", childeren: [] },
    ],
  },
  {
    name: "c name",
    id: "548hdmns",
    childeren: [
      { name: "cc name", id: "rjknjc", childeren: [] },
      { name: "ccc name", id: "gflmnc", childeren: [] },
      { name: "cccc name", id: "c788r", childeren: [] },
    ],
  },
];

const Data3 = [
  {
    name: "a name",
    id: "dccc",
    childeren: [
      { name: "aa name", id: "ciu", childeren: [] },
      { name: "aaa name", id: "cuyrbr", childeren: [] },
    ],
  },
  {
    name: "b name",
    id: "c3c",
    childeren: [
      { name: "bb name", id: "vvdfd", childeren: [] },
      { name: "bbb name", id: "linsdbv", childeren: [] },
    ],
  },
  {
    name: "c name",
    id: "v5v",
    childeren: [
      { name: "cc name", id: "vtry", childeren: [] },
      { name: "ccc name", id: "hjv", childeren: [] },
      { name: "cccc name", id: "vrax2", childeren: [] },
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
    { title: "1 title", data: Data1 },
    { title: "2 title", data: Data2 },
    { title: "3 title", data: Data3 },
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


function Accardon({ item, title }) {
  const [Tabeldata, dispatchTabeldata] = useContext(SelectItemAndChilds);
    const UpdateTabelonAddChilds =  useCallback((state , id) => {
      
       const ResultFinders =  Finder(state , id)
    //  console.log(ResultFinders , 'Called Resukt finder');
      // console.log(id , 'callback');
      
      
    },
    [],
    )
    
    
    const Reducer = (state, action) => {
      switch (action.type) {
        case "Addchilds":
          const AddItemResult = Additem(state, action.payload);
          if(AddItemResult){
            UpdateTabelonAddChilds(AddItemResult,action.payload)
          }
          return AddItemResult;
          default:
            return state;
          }
        };
        
        const [stateDataitem, dispatchDataitem] = useReducer(Reducer, item);
  const FindDataWhitid = (data) => {
    dispatchTabeldata({ type: "SetTabelData", payload: data });
  };



  var ResultFinder

  function Finder(data, id) { 
    let FindItemd = false;

    const map = (item) => {
      if (FindItemd) return item;

      if (item.id === id) {
        FindItemd = true;
       ResultFinder = item
      dispatchTabeldata({ type: "SetTabelData", payload: ResultFinder });
       console.log(ResultFinder);
        // return item
      }

      if (item.childeren)
        return {
          ...item,
          childeren: item.childeren?.map(map),
        };
    };

    return data.map(map);
  }

  const AddItemsChilds = (id) => {
    dispatchDataitem({ type: "Addchilds", payload: id });
    // UpdateTabelonAddChilds(id)
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
