import * as React from 'react';
import Grid from '@mui/material/Grid';
import './CharactersContainer.css';

export default function CharactersContainer({selectedEpisode, characterList, selectedEpisodeName}) {
  return (
    <div>
      {selectedEpisode && characterList && (
        <div className="CharactersInfo">{characterList.length} characters in episode {selectedEpisodeName && selectedEpisodeName}</div>
      )}
      <Grid container spacing={2}>
        {characterList && characterList.map(b => 
          <Grid item xs={12} sm={3}>
            <img className="CharacterImage" style={{border: '2px solid grey', maxWidth: '120px'}} key={b.id} src={b.image} />
            {selectedEpisode && <div>{b.name}</div>}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
