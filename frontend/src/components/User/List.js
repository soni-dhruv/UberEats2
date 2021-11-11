import React from 'react'
// import { IoMdContacts } from 'react-icons/io'

function List({contacts}) {
    var code="";//"<div>something else</div>";
    if(contacts.length>0){
        console.log('here');
        console.log(JSON.stringify(contacts, null, 2));
    //     code= <ul>
    //     {contacts.map(contact=>(
    //         <li key={contact.id}>
    //             Name:<span>{contact.full_name}</span> <span>    </span>
    //             Phone:<span>{contact.tel}</span>
    //         </li>
    //     ))}
    // </ul>;
    }

    return (
        <div>
            {code}
        </div>
    )
}

export default List
