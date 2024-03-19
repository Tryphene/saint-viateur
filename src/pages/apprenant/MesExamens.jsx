// import React from 'react'
import * as React from 'react';
import '../../styles/Muliti.css'
// import '../../form'
import FormMulti from '../../components/FormMulti'
import { PieChart } from '@mui/x-charts/PieChart';

const MesExamens = () => {
    
  return (
      <>
          <h1 className="text-center fs-4">Form Wizard - Multi Step Form</h1>
          <form id="signUpForm">
              {/* <!-- start step indicators --> */}
              <div className="form-header d-flex mb-4">
                  <span className="stepIndicator">Account Setup</span>
                  <span className="stepIndicator">Social Profiles</span>
                  <span className="stepIndicator">Personal Details</span>
              </div>
              {/* <!-- end step indicators --> */}
              {/* step one  */}
              <div className="step">
                  <p className="text-center mb-4">Create your account</p>
            <div className="mb-3">
                <input type="email" placeholder="Email Address" oninput="this.className = ''" name="email" />
            </div>
            <div className="mb-3">
                <input type="password" placeholder="Password" oninput="this.className = ''" name="password" />
            </div>
            <div className="mb-3">
                <input type="password" placeholder="Confirm Password" oninput="this.className = ''" name="password" />
            </div>
        </div>
    
        {/* <!-- step two */}
        <div className="step">
            <p className="text-center mb-4">Your presence on the social network</p>
            <div className="mb-3">
                <input type="text" placeholder="Linked In" oninput="this.className = ''" name="linkedin" />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Twitter" oninput="this.className = ''" name="twitter" />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Facebook" oninput="this.className = ''" name="facebook" />
            </div>
        </div>
    
         {/* step three  */}
        <div className="step">
            <p className="text-center mb-4">We will never sell it</p>
            <div className="mb-3">
                <input type="text" placeholder="Full name" oninput="this.className = ''" name="fullname" />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Mobile" oninput="this.className = ''" name="mobile" />
            </div>
            <div className="mb-3">
                <input type="text" placeholder="Address" oninput="this.className = ''" name="address" />
            </div>
        </div>
    
         {/* start previous / next buttons */}
        <div className="form-footer d-flex">
            <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
            <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
        </div>
         {/* end previous / next buttons  */}
          </form>
          <PieChart
              series={[
                  {
                      data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            // { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
      </>
  )
}

export default MesExamens
