import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const Home = () => {

  const [searched,setSearch] = useState("")
  const lookForFriends = (e)=>{
    setSearch(e.target.value)
  }
  useEffect(()=>{
    //console.log(searched)
    
  })

  const {loading,errors,data,refetch} = useQuery(QUERY_USERS)
  const [showResults,setResults] = useState([])
  // useEffect(() => {
  //   refetch();
  // }, [refetch, data]);
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
  const userData = data?.users;
  const emails = userData.map(d=>d.email)
  //console.log(emails)

  const searchUser = (e)=>{
    e.preventDefault()
    console.log(searched)
    setResults(emails.filter(e=> e === searched))
    if(showResults.length === 0){
      setResults("No account found")
    }
  }
  return (
    <div className='container border p-3'>
        <h2>This is my main page</h2>
        <form onSubmit={searchUser}>
          <input type="search" id='search' onChange={lookForFriends} className='p-2 w-50'  value = {searched} placeholder='search your buddies...' />
          <button className='p-2 ml-2'>FIND</button>
        </form>

        <div className='results border'>
          {showResults.length ? <a href='/chat' className='p-2tom'>{showResults}</a> : ""}
        </div>
    </div>
  );
};
export default Home;
