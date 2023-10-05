import { FormEvent, useState } from "react";
import { useAddNewSquareMutation, useGetSquareAllQuery, useGetSquareByIdQuery } from "../../api/squareApiSlice";
import { Square } from "./square";

// function fragmentLoading<T>(
//     data: T|undefined, 
//     error, 
//     isLoading: boolean, fragmentFn: (T|undefined) => JSX.Element): JSX.Element {
//     return <div>{error ? (
//         <>Error while loading square</>
//       ) : isLoading ? (
//         <>Loading square...</>
//       ) : data ? (
//         <>
//           <h3>{data.name}</h3>
//           {data.square}
//         </>
//       ) : null}
//     </div>
// }

// TODO: input with id => load square with this id
function SquareWithId({idSquare}:{idSquare:number}) {
    const { data, error, isLoading } = useGetSquareByIdQuery(idSquare);
    // console.log("Load square:", data?.square);
    return <div>{error ? (
        <>Error while loading square</>
      ) : isLoading ? (
        <>Loading square...</>
      ) : data ? (
        <>
          <h3>One square: {data.name}</h3>
          {data.square}
        </>
      ) : null}
    </div>
}


function SquareAll() {
    const {data,error, isLoading} = useGetSquareAllQuery();
    return (
    <div>{error ? (
        <>Error while loading square</>
      ) : isLoading ? (
        <>Loading square...</>
      ) : data ? (
        <>
            <h3>All Squares</h3>
            <ul>
                {data?.map((square,i) => <li key={`sq_${i}`}>{square.name}</li>)}
            </ul>
        </>
      ) : null}
    </div>); 
}

// inspired by this article: 
// https://www.positronx.io/react-post-data-with-redux-toolkit-rtk-query-tutorial/
export function SquareForm(){
  let formSubmitError;
  const [addNewSquare, response] = useAddNewSquareMutation();
  const [postSquare, setSquareForm] = useState('Save')
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const [name, square] = e.currentTarget.elements
      let formData: Partial<Square> = {
        name: (name as HTMLInputElement).value,
        square: JSON.parse((square as HTMLInputElement).value)
      }
      addNewSquare(formData)
        .unwrap()
        .then((square: Square) => {console.log("Square saved:", square)})
        .then((error) => {
          console.log(error)
        })
    }
  return (
  <div>
        {formSubmitError}
        <form onSubmit={onSubmit}>
          <div>
            <label>
              <strong>Enter Name</strong>
            </label>
            <input type="text" id="name" />
          </div>
          <div>
            <label>
              <strong>Enter square</strong>
            </label>
            <textarea id="square" rows={12}></textarea>
          </div>
          <div>
            <button className="btn btn-danger" type="submit">
              {postSquare}
            </button>
          </div>
        </form>
      </div>
  );
}

export function SquareManager() {
    return <div>
            <SquareForm />
            <SquareAll />
            <SquareWithId idSquare={12} />
        </div>
}