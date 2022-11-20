import React from 'react';
import { ThreeDots } from 'react-loader-spinner'
import './loading.css'

const Loading = () => {
    return (
        <>
            <div className="loadingContainer mt-0 container-fluid h-100">
                <div className="row">
                    <div className="col-12">
                        <ThreeDots
                            height="80"
                            width="80"
                            radius="9"
                            color="#FFB9B9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}


export default Loading