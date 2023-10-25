import React, { useState, useEffect } from "react";
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import './AppContainer.css';
import CharacterContainer from '../CharactersContainer/CharactersContainer.tsx';
import AppHeader from '../AppHeader/AppHeader.tsx';

const StyledList = styled(ListItem)`
  background-color: white;
  border-bottom: 2px solid grey;
  &&.Mui-selected {
   background-color: grey;
  }
  &:hover {
    background-color: #a9a9a9;
  }
`;
  
export default function AppContainer() {
	const [navList, setNavList] = useState();
	const [characterList, setCharacterList] = useState();
	const [initialCharacterList, setInitialCharacterList] = useState();
	const [selectedEpisode, setSelectedEpisode] = useState();
	const [selectedEpisodeName, setSelectedEpisodeName] = useState();
	const [checked, setChecked] = useState();

	const loadEpisodeData = (episodeNumber, episodeName) => {
		setSelectedEpisode(episodeNumber);
		setSelectedEpisodeName(episodeName);
		axios
			.get(`https://rickandmortyapi.com/api/episode/${episodeNumber}`)
			.then((response) => {
				const charList = response.data.characters;
				const getCharacterList =  charList.map(e => e.substring(e.lastIndexOf('/')).substring(1));
				// Get characters list for selected episode 
				axios.get(`https://rickandmortyapi.com/api/character/${getCharacterList}`)
					.then((r) => {
						setCharacterList(r.data);
					})
					.catch((e) => console.log(e));
			  })
			  .catch((error) => console.log(error));
	}

	const handleToggle = (episodeNumber, episodeName) => () => {
	    if (checked === episodeNumber) {
	       setChecked();
	       setSelectedEpisode();
	       setSelectedEpisodeName();
	       setCharacterList(initialCharacterList);
	    } else {
				setChecked(episodeNumber);
				loadEpisodeData(episodeNumber, episodeName);
	    }

	};

	useEffect(() => {
		axios
			.get(`https://rickandmortyapi.com/api/episode`)
			.then((response) => {
				setNavList(response.data.results);
					axios.get(`https://rickandmortyapi.com/api/character/`)
						.then((r) => {
							setCharacterList(r.data.results);
							setInitialCharacterList(r.data.results);
						})
						.catch((e) => console.log(e));
			})
		.catch((error) => console.log(error));
	}, []);
  
    return (
		<div className="AppContainer">
			<Grid container spacing={2}>
				<Grid item xs={4}> 
				  <div className="ListHeader">Episodes</div>
					<List
						sx={{
							maxWidth: 300,
							position: 'relative',
							overflow: 'auto',
							maxHeight: '100vh',
						}}
							subheader={<li />}
						>
							{navList && navList.map(b => 
								<Grid item xs={12}>
									<div style={{margin: '12px 0'}}>
										<StyledList
											key={b.id}
											role="listitem"
											button
											selected={checked === b.id}
											onClick={handleToggle(b.id, b.name)}
										>
											<ListItemText id={b.id} primary={`${b.name}`} />
										</StyledList>
									</div>
								</Grid>
							)}
					</List>
				</Grid>
				<Grid item xs={8}>
					<CharacterContainer 
						selectedEpisode={selectedEpisode} 
						characterList={characterList} 
						selectedEpisodeName={selectedEpisodeName}/>
				</Grid>
			</Grid>
		</div>
    )
}
