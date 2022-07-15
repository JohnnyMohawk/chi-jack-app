import React from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { removeZeros } from '../services/mapService';
import styles from '../styles/MapComp.module.css'

export default function MapDesktop({containerStyle, lat, lng, options, onMapLoad, setSelectedCrime, selectedCrime, showHomicide, 
    homicideStats, showSexAssault, sexAssaultStats, showRobbery, robberyStats, showBattery, batteryStats, showAssault, assaultStats, 
    showViolation, violationStats, showShotsFired, shotsFiredStats, showGunPossession, gunPossessionStats, showAmmoViolation, 
    ammoViolationStats, showGunSale, gunSaleStats, showGunInSchool, gunInSchoolStats, showGunAttackOnCops, gunAttackOnCopsStats, 
    showAttackOnCops, attackOnCopsStats, showCarjack, carjackStats}) {
    return (
        <>
        <GoogleMap
            className={styles.mapCanvas}
            mapContainerStyle={containerStyle}
            center={{lat: lat, lng: lng}}
            zoom={13}
            options={options}
            onLoad={onMapLoad}
        >
            {showHomicide && homicideStats?.map((homicide) => (
                <Marker 
                    key={homicide.id} 
                    position={{ 
                        lat: parseFloat(homicide.latitude), 
                        lng: parseFloat(homicide.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(homicide)
                    }}
                    icon={{
                        url: `images/crime-icons/homicide.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showSexAssault && sexAssaultStats?.map((sexAssault) => (
                <Marker 
                    key={sexAssault.id} 
                    position={{ 
                        lat: parseFloat(sexAssault.latitude), 
                        lng: parseFloat(sexAssault.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(sexAssault)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-assault.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showRobbery && robberyStats?.map((robbery) => (
                <Marker 
                    key={robbery.id} 
                    position={{ 
                        lat: parseFloat(robbery.latitude), 
                        lng: parseFloat(robbery.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(robbery)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-robbery.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showBattery && batteryStats?.map((battery) => (
                <Marker 
                    key={battery.id} 
                    position={{ 
                        lat: parseFloat(battery.latitude), 
                        lng: parseFloat(battery.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(battery)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-battery.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showAssault && assaultStats?.map((assault) => (
                <Marker 
                    key={assault.id} 
                    position={{ 
                        lat: parseFloat(assault.latitude), 
                        lng: parseFloat(assault.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(assault)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-assault.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showViolation && violationStats?.map((violation) => (
                <Marker 
                    key={violation.id} 
                    position={{ 
                        lat: parseFloat(violation.latitude), 
                        lng: parseFloat(violation.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(violation)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-law-violation.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showShotsFired && shotsFiredStats?.map((shots) => (
                <Marker 
                    key={shots.id} 
                    position={{ 
                        lat: parseFloat(shots.latitude), 
                        lng: parseFloat(shots.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(shots)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-firing.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showGunPossession && gunPossessionStats?.map((gun) => (
                <Marker 
                    key={gun.id} 
                    position={{ 
                        lat: parseFloat(gun.latitude), 
                        lng: parseFloat(gun.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(gun)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-no-fire.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showAmmoViolation && ammoViolationStats?.map((ammo) => (
                <Marker 
                    key={ammo.id} 
                    position={{ 
                        lat: parseFloat(ammo.latitude), 
                        lng: parseFloat(ammo.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(ammo)
                    }}
                    icon={{
                        url: `images/crime-icons/ammo-violation.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showGunSale && gunSaleStats?.map((sale) => (
                <Marker 
                    key={sale.id} 
                    position={{ 
                        lat: parseFloat(sale.latitude), 
                        lng: parseFloat(sale.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(sale)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-sale.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showGunInSchool && gunInSchoolStats?.map((guns) => (
                <Marker 
                    key={guns.id} 
                    position={{ 
                        lat: parseFloat(guns.latitude), 
                        lng: parseFloat(guns.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(guns)
                    }}
                    icon={{
                        url: `images/crime-icons/gun-in-school.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showGunAttackOnCops && gunAttackOnCopsStats?.map((attacks) => (
                <Marker 
                    key={attacks.id} 
                    position={{ 
                        lat: parseFloat(attacks.latitude), 
                        lng: parseFloat(attacks.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(attacks)
                    }}
                    icon={{
                        url: `images/crime-icons/shots-on-police.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showAttackOnCops && attackOnCopsStats?.map((attacks) => (
                <Marker 
                    key={attacks.id} 
                    position={{ 
                        lat: parseFloat(attacks.latitude), 
                        lng: parseFloat(attacks.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(attacks)
                    }}
                    icon={{
                        url: `images/crime-icons/attack-on-police.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {showCarjack && carjackStats?.map((carjacking) => (
                <Marker 
                    key={carjacking.id} 
                    position={{ 
                        lat: parseFloat(carjacking.latitude), 
                        lng: parseFloat(carjacking.longitude) 
                    }}
                    onClick={() => {
                        setSelectedCrime(carjacking)
                    }}
                    icon={{
                        url: `images/crime-icons/carjacking.png`,
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(70, 70),
                    }}
                />
            ))}
            {selectedCrime && (
                <InfoWindow
                    position={{ 
                        lat: parseFloat(selectedCrime.latitude), 
                        lng: parseFloat(selectedCrime.longitude) 
                    }}
                    onCloseClick={() => {
                        setSelectedCrime(null)
                    }}
                >
                    <div className={styles.infoWindow}>
                        <h2>{removeZeros(selectedCrime.block.split(''))}</h2>
                        <h3>{new Date(selectedCrime.date.split('T')[0]).toDateString()}</h3>
                        <h3>{"At "+selectedCrime.date.split('T')[1].split(':')[0]+":"+selectedCrime.date.split('T')[1].split(':')[1]+" Hours"}</h3>
                        <h3>{selectedCrime.primary_type}</h3>
                        <h3 className={styles.crimeDesc}>{selectedCrime.description}</h3>
                        <h3 className={styles.crimeLocDesc}>{selectedCrime.location_description}</h3>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
        </>
    )
}