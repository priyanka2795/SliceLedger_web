import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Image } from 'react-bootstrap'
import Member from '../../assets/images/member.png'
export default function TeamMember() {
    return (
        <>
            <div className="slice_team_member">
                <div className='team_member_pic'>
                    <Image src={Member} fluid />
                </div>
                <div className='team_member_details'>
                    <p className='member_description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptatum magnam earum dicta delectus itaque placeat.</p>
                    <h3>Name</h3>
                    <p className='member_title'>Title</p>
                </div>
                <div className='team_member_social'>
                    <a href="/">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/">
                        <FontAwesomeIcon icon={faDiscord} />
                    </a>
                </div>
            </div>
        </>
    )
}
