import React, {useEffect} from 'react'
import '../../App.css'
import '../pages/JackKnows.css'


function JackKnows () {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="how-container">
                <h1>How Jack Knows?</h1>
                <div className="how-text">
                    <p>
                        Shy Jack taps into the Chicago Police Department's CLEAR (Citizen Law Enforcement Analysis and Reporting) 
                        system. This dataset reflects reported incidents of crime (with the exception of murders where data exists 
                        for each victim) that have occurred in the City of Chicago from 2001 to present, minus the most recent seven 
                        days. In order to protect the privacy of crime victims, addresses are shown at the block level only and 
                        specific locations are not identified. Should you have questions about this dataset, you may contact the 
                        Research & Development Division of the Chicago Police Department at
                        &nbsp;<a href="mailto:PSITAdministration@ChicagoPolice.org">PSITAdministration@ChicagoPolice.org</a>.&nbsp;
                        Disclaimer: These crimes may be based upon preliminary information supplied to the Police Department by the 
                        reporting parties that have not been verified. The preliminary crime classifications may be changed at a 
                        later date based upon additional investigation and there is always the possibility of mechanical or human 
                        error. Therefore, the Chicago Police Department or Shy Jack do not guarantee (either expressed or implied) the accuracy, 
                        completeness, timeliness, or correct sequencing of this information. The Chicago Police Department or Shy Jack will not be responsible for any error or omission, 
                        or for the use of, or the results obtained from the use of this information. All data visualizations on maps 
                        should be considered approximate and attempts to derive specific addresses are strictly prohibited. The user 
                        specifically acknowledges that Shy Jack is not responsible for any defamatory, offensive, 
                        misleading, or illegal conduct of other users, links, or third parties and that the risk of injury from the 
                        foregoing rests entirely with the user. Data are updated daily. To access a list of 
                        Chicago Police Department - Illinois Uniform Crime Reporting (IUCR) codes,&nbsp;  
                        <a href="http://data.cityofchicago.org/Public-Safety/Chicago-Police-Department-Illinois-Uniform-Crime-R/c7ck-438e" target="_blank" rel="noopennernoreferrer" className="code-link">CLICK HERE</a>
                    </p>
                </div>
            </div>
        </>
    )

}


export default JackKnows