import React from 'react'

export default function Error() {
    return (
        <div>
            <div style={{
                display:'flex', justifyContent:'center', alignItems:'center',
                height:'100vh',
            }}>
                <div>
                    <div style={{display:'flex', justifyContent:'center',fontSize:'50px'}}>
                        404 Error
                    </div>
                    <div style={{fontSize:'45px',color:'grey'}}>This page does not exist</div>
                    <div style={{display:'flex',justifyContent:'center',fontSize:'45px',color:'grey'}}>
                        Please go back
                    </div>
                </div>
            </div>
        </div>
    )
}
