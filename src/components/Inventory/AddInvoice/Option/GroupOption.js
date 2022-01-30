import * as multiService from "../../../../services/MultiService";
const GroupOption=({
    group
})=>
{
    return (<option value={group.props.name} >{multiService.FirstLetterToUpperCase(group.props.name)}</option>)
}

export default  GroupOption;