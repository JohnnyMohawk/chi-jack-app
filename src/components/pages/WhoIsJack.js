import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../pages/WhoIsJack.css'


function WhoIsJack () {

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <div className="about-container">
                <h1>Who is Shy Jack?</h1>
                <div className="about-text">
                    <p className='whoIsJackCopy'>
                        Hi, I’m John Nelson-Alden. I am a lifelong Chicagoan and I love this city. As most Chicagoans know however, Chicago 
                        politics is and always has been corrupt. The politicians lie with statistics. We are presented half truths and 
                        fabrications as fact and simplistic political agendas are promoted as solutions to complex societal problems. 
                    </p>
                    <p className='whoIsJackCopy'>
                        I created Shy Jack to bring important data directly to the people of Chicago, free of any 
                        political or ideological spin. The raw, unmanipulated data can be mapped and graphed according to the users 
                        search parameters, providing access to easily understandable visual representations of the data that 
                        matters to them.
                    </p>
                    
                    <p className='whoIsJackCopy'>
                        Chicago has its share of problems that must be addressed. 
                        The numbers are clear that homicides, carjackings, and general gun crimes are on track to be a worse problem 
                        than in past decades. Shy Jack’s data modeler is designed to explore these issues. The user-friendly interface sorts, filters, maps and 
                        graphs all data that applies to the following crimes committed in Chicago:
                    </p>
                    <p className='whoIsJackCopy list'>
                        <strong>Murder:</strong> 1st degree murder, 2nd degree murder, involuntary manslaughter, and reckless homicide.<br></br>
                        <strong>Assault:</strong> All assaults committed with a firearm.<br></br>
                        <strong>Sexual Assault:</strong> All sexual assaults committed with a firearm.<br></br>
                        <strong>Robbery:</strong> All robberies committed with a firearm.<br></br>
                        <strong>Battery:</strong> All batteries committed with a firearm.<br></br>
                        <strong>Unlawful Use:</strong> All unlawful firearm use and reckless firearm discharge reports.<br></br>
                        <strong>Unlawful Possession:</strong> All unlawful firearm possession reports.<br></br>
                        <strong>Ammunition Violations:</strong> All unlawful ammo possession and banned ammo sales / possession.<br></br>
                        <strong>Illegal Gun Sales:</strong> All unlawful firearm sales.<br></br>
                        <strong>Guns in Schools:</strong> All reports of firearm sales / possession / use in schools.<br></br>
                        <strong>License & Registration Violations:</strong> All firearm license and registration violations.<br></br>
                        <strong>Gun Attacks on Police:</strong> All assaults and batteries of police officers involving a firearm.<br></br>
                        <strong>Attacks on Police:</strong> All assaults and batteries of police officers not involving a firearm.<br></br>
                        <strong>Carjackings:</strong> All instances of vehicular hijacking.<br></br>
                    </p>
                    <p>
                        How does&nbsp;
                        <Link to="/how-it-works" className="inline-logo">
                            Shy Jack<i class="fas fa-car-crash"></i>
                        </Link> 
                        &nbsp;work?
                    </p>
                </div>
            </div>
        </>
    )

}

export default WhoIsJack