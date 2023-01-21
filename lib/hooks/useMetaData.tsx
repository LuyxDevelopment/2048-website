import Head from 'next/head';
import { useState, useEffect } from 'react';

export const useMetaData = ({ description, name, url }: {
	name?: string,
	description?: string,
	url?: string,
}): JSX.Element => {
	const [image, setImage] = useState('');

	useEffect(() => {
		fetch(`/api/og?description=${description}`).then((res) => {
			if (res.ok) {
				setImage(res.url);
			} else {
				setImage(`${process.env.NEXTAUTH_URL}/assets/logo.png`);
			}
		});
	});

	return (
		<Head>
			<title>{`${name}`}</title>
			<link
				rel="shortcut icon"
				href="/assets/favicons/favicon.ico"
				type="image/png"
			/>

			<meta
				property="og:title"
				content={name}
			/>
			<meta
				property="og:description"
				content={description}
			/>
			<meta
				property="og:url"
				content={url}
			/>
			<meta
				property="og:image"
				content={image}
			/>
			<meta
				content="#EF4444"
				data-react-helmet="true"
				name="theme-color"
			/>
		</Head>
	);
};
