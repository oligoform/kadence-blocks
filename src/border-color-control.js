/**
 * Measure Component
 *
 */

/**
 * Import Icons
 */
import icons from './icons';

/**
 * Import External
 */
import map from 'lodash/map';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	Fragment,
} = wp.element;
const {
	ColorPalette,
} = wp.editor;
const {
	Button,
	ButtonGroup,
	Tooltip,
} = wp.components;

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function BorderColorControls( {
	label,
	values,
	control,
	onChange,
	onControl,
	controlTypes = [
		{ key: 'linked', name: __( 'Linked' ), icon: icons.linked },
		{ key: 'individual', name: __( 'Individual' ), icon: icons.individual },
	],
	firstIcon = icons.outlinetop,
	secondIcon = icons.outlineright,
	thirdIcon = icons.outlinebottom,
	fourthIcon = icons.outlineleft,
} ) {
	return [
		onChange && onControl && (
			<Fragment>
				<ButtonGroup className="kt-size-type-options kt-outline-control" aria-label={ __( 'Color Control Type' ) }>
					{ map( controlTypes, ( { name, key, icon } ) => (
						<Tooltip text={ name }>
							<Button
								key={ key }
								className="kt-size-btn"
								isSmall
								isPrimary={ control === key }
								aria-pressed={ control === key }
								onClick={ () => onControl( key ) }
							>
								{ icon }
							</Button>
						</Tooltip>
					) ) }
				</ButtonGroup>
				{ control && control !== 'individual' && (
					<Fragment>
						<p className="kt-setting-label">{ label }</p>
						<ColorPalette
							value={ ( values ? values[ 0 ] : '' ) }
							onChange={ ( value ) => onChange( [ value, value, value, value ] ) }
						/>
					</Fragment>
				) }
				{ control && control === 'individual' && (
					<div className="kt-border-color-array-control">
						<p className="kt-setting-label">{ label }</p>
						<p className="kt-border-color-icon">{ firstIcon }</p>
						<ColorPalette
							value={ ( values ? values[ 0 ] : '' ) }
							onChange={ ( value ) => onChange( [ value, values[ 1 ], values[ 2 ], values[ 3 ] ] ) }
						/>
						<p className="kt-border-color-icon">{ secondIcon }</p>
						<ColorPalette
							value={ ( values ? values[ 1 ] : '' ) }
							onChange={ ( value ) => onChange( [ values[ 0 ], value, values[ 2 ], values[ 3 ] ] ) }
						/>
						<p className="kt-border-color-icon">{ thirdIcon }</p>
						<ColorPalette
							value={ ( values ? values[ 2 ] : '' ) }
							onChange={ ( value ) => onChange( [ values[ 0 ], values[ 1 ], value, values[ 3 ] ] ) }
						/>
						<p className="kt-border-color-icon">{ fourthIcon }</p>
						<ColorPalette
							value={ ( values ? values[ 3 ] : '' ) }
							onChange={ ( value ) => onChange( [ values[ 0 ], values[ 1 ], values[ 2 ], value ] ) }
						/>
					</div>
				) }
			</Fragment>
		),
	];
}
