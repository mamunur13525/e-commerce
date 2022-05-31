import { MdOutlineArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export const ArrowBack = (props) => {
    const { className, onClick } = props;
 
    return (
        <MdOutlineArrowBackIosNew
            className={className}
            onClick={onClick}
        />
    )
}

export const ArrowForward = (props) => {
    const { className, onClick } = props;
    return (
        <MdArrowForwardIos
            className={className}
            onClick={onClick}
        />
    )
}
