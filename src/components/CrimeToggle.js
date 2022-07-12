import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import styles from '../styles/CrimeToggleComp.module.css'

export default function CrimeToggle({
    showHomicide, setShowHomicide, showAssault, setShowAssault, showSexAssault, setShowSexAssault, showRobbery, 
    setShowRobbery, showBattery, setShowBattery, showViolation, setShowViolation, showShotsFired, setShowShotsFired, 
    showGunPossession, setShowGunPossession, showAmmoViolation, setShowAmmoViolation, showGunSale, setShowGunSale, 
    showGunInSchool, setShowGunInSchool, showGunAttackOnCops, setShowGunAttackOnCops, showAttackOnCops, setShowAttackOnCops, 
    showCarjack, setShowCarjack}) {
  return (
    <>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showHomicide}
                onChange={() => {
                    setShowHomicide(!showHomicide);
                }}>
                Homicides
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showAssault}
                onChange={() => {
                    setShowAssault(!showAssault);
                }}>
                Assaults
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showSexAssault}
                onChange={() => {
                    setShowSexAssault(!showSexAssault);
                }}>
                Sex. Assaults
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showRobbery}
                onChange={() => {
                    setShowRobbery(!showRobbery);
                }}>
                Robberies
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showBattery}
                onChange={() => {
                    setShowBattery(!showBattery);
                }}>
                Batteries
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showViolation}
                onChange={() => {
                    setShowViolation(!showViolation);
                }}>
                Gun Violations
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showShotsFired}
                onChange={() => {
                    setShowShotsFired(!showShotsFired);
                }}>
                Shots Fired
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showGunPossession}
                onChange={() => {
                    setShowGunPossession(!showGunPossession);
                }}>
                Gun Possession
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showAmmoViolation}
                onChange={() => {
                    setShowAmmoViolation(!showAmmoViolation);
                }}>
                Ammo Violation
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showGunSale}
                onChange={() => {
                    setShowGunSale(!showGunSale);
                }}>
                Illegal Gun Sales
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showGunInSchool}
                onChange={() => {
                    setShowGunInSchool(!showGunInSchool);
                }}>
                Gun in School
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showGunAttackOnCops}
                onChange={() => {
                    setShowGunAttackOnCops(!showGunAttackOnCops);
                }}>
                Shots on Cops
            </ToggleButton>
        </div>
        <div className={styles.crimeToggleBar}>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showAttackOnCops}
                onChange={() => {
                    setShowAttackOnCops(!showAttackOnCops);
                }}>
                Attack on Cops
            </ToggleButton>
            <ToggleButton
                className={styles.crimeView}
                color="warning"
                value="check"
                selected={showCarjack}
                onChange={() => {
                    setShowCarjack(!showCarjack);
                }}>
                Carjackings
            </ToggleButton>
        </div>
    </>
  )
}
