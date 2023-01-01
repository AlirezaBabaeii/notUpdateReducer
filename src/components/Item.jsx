import { useContext } from "react";
import { FunctionFinderContext } from "./context";

export default function Item({ data }) {
  const [FindDataWhitid,AddItemsChilds] = useContext(FunctionFinderContext);

  const SendidToParent = () => {
    FindDataWhitid(data);
  };

  return (
    <div style={{border:'5px solid yellow' , margin:'10px'}}>

<div style={{display:'flex' , flexDirection:'row' , width:"100%" , height:"50px" , justifyContent:'space-between'}}>
<h4 onClick={()=> SendidToParent()}>childs name : {data.name}</h4>
      <button onClick={()=> AddItemsChilds(data.id)}>Add Childs</button>
</div>

      {data.childeren?.map((value, index) => {
        return <Item data={value} />;
      })}
    </div>
  );
}
