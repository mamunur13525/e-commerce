import { useState } from "react"

export default function Temp() {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const [selectedAlphabet, setSelectedAlphabet] = useState([])

    const buttonHandler = (e) => {
        e.preventDefault()
        
        const completedCount = Math.floor(selectedAlphabet.length / alphabet.length)
        const newAlphabet = [...selectedAlphabet]
        if(completedCount >= 1) {
            let tempAlphabet = alphabet[(selectedAlphabet.length - (completedCount * alphabet.length))]
            newAlphabet.push( alphabet[0].repeat(completedCount) + tempAlphabet)
        }
        else {
            newAlphabet.push(alphabet[selectedAlphabet.length])
        }
        
        setSelectedAlphabet(newAlphabet)
    }
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <button onClick={buttonHandler} className="fixed top-[10px] bg-sky-500 text-white px-10 py-2 rounded-sm cursor-pointer">ADD</button>
            <div className="p-10 flex flex-wrap">
                {
                    selectedAlphabet.map((singleAlphabet, index) => <span key={index} className="bg-lime-500 text-white w-20 h-8 m-1 flex justify-center items-center rounded-sm text-lg">{singleAlphabet}</span>)
                }
            </div>
        </div>
    )
}