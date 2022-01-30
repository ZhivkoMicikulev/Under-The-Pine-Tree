import * as multiService from '../../../../services/MultiService';


const GroupTableRow=(
    {
       group,
    }
)=>{
  
    return (
             
        <td>{multiService.FirstLetterToUpperCase(group.props.name)}</td>
     
    )
}
export default GroupTableRow;