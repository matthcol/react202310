import { useAppSelector } from "../../app/hooks"
import { selectSize } from "./squareSlice"


export function SquareGame() {
    // const size = useAppSelector((state) => state.square.size) 
    const size = useAppSelector(selectSize)
    return <div>This is the Game in {size} x {size}</div>
}