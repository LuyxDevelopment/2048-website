import { Html, Head, Main, NextScript } from 'next/document';
import { ReactNode } from 'react';

export default function Document(): ReactNode {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
