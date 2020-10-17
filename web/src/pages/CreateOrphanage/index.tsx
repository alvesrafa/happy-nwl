import React, { useState, FormEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import L from 'leaflet';
import { useHistory } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import mapMarkerImg from '../../assets/images/marker.svg';
import SideBar from '../../components/SideBar';
import './create-orphanage.css';
import Orphanage from '../Orphanage';
import { toast } from 'react-toastify';
import api from '../../services/api';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  };
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [data, setData] = useState({
    name: '',
    instructions: '',
    opening_hours: '',
    about: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreview] = useState<string[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
    const selectedImagesPreview = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreview(selectedImagesPreview);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { latitude, longitude } = position;
    console.log({ ...data, longitude, latitude, open_on_weekends, images });
    const form = new FormData();

    form.append('name', data.name);
    form.append('longitude', String(longitude));
    form.append('latitude', String(latitude));
    form.append('open_on_weekends', String(open_on_weekends));
    form.append('instructions', data.instructions);
    form.append('opening_hours', data.opening_hours);
    form.append('about', data.about);

    images.forEach((image) => {
      form.append('images', image);
    });

    await api.post('orphanages', form);

    toast.success('Cadastro realizado com sucesso');
    history.push('/map');
  };
  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" name="name" onChange={handleInputChange} />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                name="about"
                onChange={handleTextAreaChange}
                maxLength={300}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={data?.name} />;
                })}
                <label htmlFor="images[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                name="images[]"
                id="images[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                name="instructions"
                onChange={handleTextAreaChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                name="opening_hours"
                onChange={handleInputChange}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  onClick={() => setOpenOnWeekends(false)}
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? 'active' : ''}
                  type="button"
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
