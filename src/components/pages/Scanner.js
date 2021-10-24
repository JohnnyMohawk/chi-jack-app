import React from "react";
import '../../App.css'

function Scanner() {
    return (
        <>
            <div className="scanner-player" dangerouslySetInnerHTML={{ __html: "<iframe src='https://www.broadcastify.com/webPlayer/31652' />"}} />
        </>
    )

}

export default Scanner