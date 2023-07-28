import React from 'react'

export default function PhaseInverted() {
    return (
        <>
            <div className='slice_roadMap_mainDiv slice_phaseMain'>
                <div className='phase_content'>
                    <h3>Phase</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aspernatur in, ut necessitatibus accusantium porro.</p>
                </div>
                <div className='phase_bars_inverted'>
                    <div className='phase_main_bar'></div>
                    <div className='phase_indication_bar'></div>
                    <div className="phase_dot">
                        <div className="phase_innerDot"></div>
                    </div>
                </div>
                <div className='phase_date'>
                    <h5>00 March 2022</h5>
                </div>
            </div>
            <div className='slice_roadMap_mainDiv slice_phaseInvert_duplicate'>
                <div className='phase_date'>
                    <h5>00 March 2022</h5>
                </div>
                <div className='phase_bars'>
                    <div className='phase_main_bar'></div>
                    <div className='phase_indication_bar'></div>
                    <div className="phase_dot">
                        <div className="phase_innerDot"></div>
                    </div>
                </div>
                <div className='phase_content'>
                    <h3>Phase</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum aspernatur in, ut necessitatibus accusantium porro.</p>
                </div>
            </div>
        </>
    )
}
