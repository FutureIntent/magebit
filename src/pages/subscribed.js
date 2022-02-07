import React, { useState, useEffect, useContext } from 'react';
import { URLContext } from './../context/back_end_url.js';

function Subscribed() {

    //list of all subscribers
    const [subscriber, setSubscriber] = useState([]);

    //all search filters for buttons
    const [filterButton, setFilterButton] = useState([
        {
        htmlName: 'date',
        filterName: 'order',
        value: 'createdAt'
        },
        {
            htmlName: 'name',
            filterName: 'order',
            value: 'email'
        },
        {
            htmlName: 'down',
            filterName: 'direction',
            value: 'DESC'
        },
        {
            htmlName: 'up',
            filterName: 'direction',
            value: 'ASC'
        }
    ]);

    //list of all providers
    const [provider, setProvider] = useState([]);

    //list of checked rows
    const [checkedBox, setCheckedBox] = useState([]);

    //global back-end URL
    const BackEndURL = useContext(URLContext);

    //fetch filters
    const [fetchFilter, setFetchFilter] = useState({
        email: '',
        order: 'createdAt',
        direction: 'DESC'
    });

    //current fetch URL
    let fetchURL = `${BackEndURL}/subscriber/show?email=${fetchFilter.email}&order=${fetchFilter.order}&direction=${fetchFilter.direction}`;

    //fetch data from server
    useEffect(() => {
        fetch(fetchURL, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => {
                if (data.status == true) {
                    setProvider(data.provider);
                    setSubscriber(data.result);
                } else {
                    console.log(data.message);
                }
                    })
            .catch(err => console.log("Unable to retrieve data from the server"))

        //logs fetch URL if it's changed
        console.log(fetchURL);

    }, [fetchURL]);

    //insert filter in fetching URL
    function handleFilter(event) {

        //get filter settings
        const filterName = event.target.name;
        const filterValue = event.target.value;

        //change fetching URL and cause rerender
        setFetchFilter(prevState => {

            return { ...prevState, [filterName]: filterValue}
        });
    }

    //log fetch filters
    console.log(fetchFilter);

    //store checked ids in a state
    function handleCheck(event) {

        //get id and checkbox status
        const id = event.target.name;
        const checkStatus = event.target.checked;

        //if checked then change state
        if (checkStatus) {
            setCheckedBox(prevState => [...prevState, id]);
        } else {                                                           //else filter through every element and keep checked
            const checkList = checkedBox.filter((check) => {
                return check != id;
            });
            setCheckedBox(prevState => checkList);                     //change checkedBox state(keep checked)
        }
      
    }

    //checkbox array
    console.log(checkedBox);

    //html elements
    const filterButtons = filterButton.map((button, index) => <button key={index} name={button.filterName} value={button.value} onClick={ handleFilter}>{button.htmlName}</button>);
    const uniqueProvider = provider.map((provider, index) => <button key={index} name="email" value={provider.uniqueEmail} onClick={handleFilter}>{provider.uniqueEmail}</button>);
    const allProviders = <button name='email' value={''} onClick={ handleFilter }>All</button>
    const deletion = <button name="deletion" onClick={handleDelete}>Delete</button>
    const subscribers = subscriber.map((subscriber, index) => <tr key={ index }>
        <td><input name={subscriber.id} type='checkbox' onClick={ handleCheck }/></td>
        <td>{subscriber.id}</td>
        <td>{subscriber.email}</td>
        <td>{subscriber.createdAt}</td>
    </tr>);

    //delete checked posts
    function handleDelete(event) {
        fetch(`${BackEndURL}/subscriber/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailsToDelete: checkedBox
            })
        })
            .then(data => data.json())
            .then(data => {

                if (data.status == true) {

                    //logs server's response
                    console.log(data)

                    //shows alert box and refreshes current page after 1 seconds of pressing "ok"          
                    alert(data.message);
                    setTimeout(() => window.location.reload() , 1000)

                } else {
                    console.log(data);
                }

            })
            .catch(err=>console.log(err))
    }

    return (
        <div>
            <br />
            {deletion}
            <br />
            <br />
            {filterButtons}
            <br />
            <br />
            {allProviders}
            {uniqueProvider}
            <br />
            <br />
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>EMAIL</th>
                        <th>date</th>
                </tr>
                    {subscribers}
                </tbody>
            </table>
            
        </div>
        );
}

export default Subscribed;