import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';

const useStyle = makeStyles((theme) => {
  const width = '150px';
  const height = width;
  const darkCamelColor = '#3f51b5';
  const camelColor = '#3f51b5';
  return {
    placeholderBorder: {
      width,
      height,
      border: `5px dashed ${darkCamelColor}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5px',
    },
    placeholder: {
      width: '125px',
      height: '125px',
      padding: '5px',
      backgroundColor: camelColor,

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      color: 'white',
      fontSize: '20px',
    },
    mainImg: {
      width: '125px',
      height: '125px',
      padding: '5px',
    },
  };
});

export default function ImageWatched({ control }) {
  const classes = useStyle();

  const image = useWatch({
    control,
    name: 'image',
  });

  const [imageSrc, setImageSrc] = useState('');

  if (image?.[0]) {
    const fr = new FileReader();
    fr.onload = () => {
      setImageSrc(fr.result);
    };
    fr.readAsDataURL(image[0]);
  }

  return (
    (image?.[0] && (
      <div className={classes.placeholderBorder}>
        <img className={classes.mainImg} alt="new-place" src={imageSrc} />
      </div>
    )) || (
      <div className={classes.placeholderBorder}>
        <div className={classes.placeholder}>None</div>
      </div>
    )
  );
}
