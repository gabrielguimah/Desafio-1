import React from "react";
import {Select} from "antd";
import Users from "../api/users.json"
import Groups from "../api/groups.json"

 export class SelectModal extends React.Component{

    render(){
        const { Option, OptGroup } = Select;

            return(
                <div>
                     <Select defaultValue="Grupos" style={{ width: 120 }}>
                        <OptGroup label="Grupos">
                            {
                    Groups.groups.map((result)=>(<Option text= {result.group_id}>{result.name}</Option>))
                            }
                    </OptGroup>
                    </Select>
                    <Select defaultValue="Usuários" style={{ width: 120 }}>
                        <OptGroup label="Usuários">
                                {
                        Users.users.map((result)=>(<Option  text= {result.id}>{result.name}</Option>))
                                }
                        </OptGroup>
                        </Select>      
                </div>
            )
    }
}
export default SelectModal;