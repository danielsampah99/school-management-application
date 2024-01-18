import { useState } from "react"
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

interface Props {
	countryCss: string;
	regionCss: string;
	containerCss: string;
}

const CountryRegion = ({containerCss, countryCss, regionCss }: Props) => {
	const [selectedCountry, setSelectedCountry] = useState<string>('')
	const [selectedRegion, setSelectedRegion] = useState<string>('')

	const handleCountryChange = (country: string) => {
		setSelectedCountry(country)
	}

	const handleRegionChange = (region: string) => { setSelectedRegion(region) }


	return (

		<>
			<div className={containerCss}>
				<CountryDropdown id="country" value={selectedCountry} onChange={handleCountryChange} classes={countryCss} />
				<RegionDropdown id="region" blankOptionLabel="Region" country={selectedCountry} value={selectedRegion} onChange={handleRegionChange} classes={regionCss}/>
			</div>
		</>
	)
}

export default CountryRegion