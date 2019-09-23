import React from 'react';

const Profile = () => (
    <div>
        <p>COMPLETE PROFILE PAGE</p>
        <form>
            <table>
                <tbody>
                    <tr>
                        <td><img src={require ("../../../assets/MOI.jpg")} className="rounded" alt="profile picture"/></td>
                        <td>NAME: YOUR EXCITING</td>
                    </tr>
                    <tr>
                        <td>ADDRESS</td>
                        <td><input name="address" id="address" autoComplete="off"/></td>
                    </tr>
                    <tr>
                        <td>EMAIL</td>
                        <td><input name="email" id="email" autoComplete="off"/></td>
                    </tr>
                    <tr>
                        <td>PHONE NUMBER</td>
                        <td><input name="phone" id="spank" autoComplete="off"/></td>
                    </tr>
                </tbody>
            </table>
        </form>
        <button>COMPLETE</button>
    </div>
)

export default Profile;