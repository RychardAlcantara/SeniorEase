interface Props {
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({children,onClick}:Props){

return(

<button
onClick={onClick}
className="bg-blue-600 text-white text-lg px-6 py-4 rounded-xl hover:bg-blue-700"
>

{children}

</button>

)

}