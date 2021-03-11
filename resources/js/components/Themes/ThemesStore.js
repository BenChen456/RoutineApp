import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from '../../AppContext';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import ThemesBar from './ThemesBar';

export default function ThemesStore() {
    const {
        user, setUser,
        themes,setThemes,
        userThemes,setUserThemes} = useContext(AppContext);

    const [loaded, setLoaded] = useState(false);
    const buy = (theme, points) => {

        //Short Points
        if(points > user.points){
            return alert(`You are short ${(points-user.points)} points`)
        }
        
        //Already owned
        userThemes.forEach(t => {
            if(t.theme_id === theme.theme_id)
                return alert(`Theme already owned`)
        })

        setLoaded(false);

        //Points
        let newPoints = user.points - points;
        setUser({...user, points:newPoints})

        //Themes
        
            //Setting to false so it loads in other thing again
            let userTh = [...userThemes, {...theme}];
            setUserThemes([...userTh]);

        axios.post('http://localhost:8000/api/auth/themesBuy', {
            fk_user_id: user.id,
            theme_id: theme.theme_id,
            name:theme.name, 
            main_color:theme.main_color,
            done_color:theme.done_color,
            text_color:theme.text_color,
            user: {points: newPoints}
        }).then(res => setLoaded(true))

    }

    useState(()=>{
        if(userThemes[0]){
            setLoaded(true);
        }

        axios.post('/api/auth/userThemes', {
            id: user.id,
        }).then(res => {
            console.log(userThemes)
            setUserThemes([true, {
                name:'Default', main_color:'#2FA360',done_color:'#edce44',text_color:'white',
                id:1,fk_user_id:user.id,theme_id:1,points:0
            }, ...res.data]);
            setLoaded(true);
        })  
    },[])

    return (
        <div>
            <div>{!loaded ? 
                <div style={{
                    display: 'flex', justifyContent:'center', alignItems:'center', paddingTop:'150px'
                }}>
                    <Spinner color="dark" />
                </div>
                    :
                <div>
                    <div style={{padding:'7% 10% 10% 10%'}}>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                            <div style={{fontSize:'50px'}}>Themes Store</div>
                            <div style={{fontSize:'35px',display:'flex'}}>
                                <div className="navItem" style={{margin:'0px -4px 0px 0px'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" fill="#ffaf11" className="bi bi-award-fill" viewBox="0 0 16 16">
                                    <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                                    </svg>
                                </div>
                                <div>{user.points}</div>
                            </div>
                        </div>

                        <div style={{height:'75%', width:'100%'}}>
                            {themes.map(t => 
                                <ThemesBar key={t.theme_id} t={t} buy={buy} />
                            )}
                        </div>
                    </div>
                </div>
            }</div>
        </div>
    )
}
