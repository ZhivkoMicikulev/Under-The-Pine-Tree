import { FirstLetterToUpperCase } from "../../services/MultiService"


const ReportTableRow=({
    product
})=>{

    return(
        <tr>
    
        <td>{FirstLetterToUpperCase(product.name)}</td>
        <td>{product.quantity}</td>
        <td>{product.total} лв.</td>
      </tr>
    )

}

export default ReportTableRow