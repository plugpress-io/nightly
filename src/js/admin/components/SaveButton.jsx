import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SaveButton = ({
    onClick,
    disabled = false,
    loading = false,
    className = 'button button-primary'
}) => (
    <Button
        variant="primary"
        onClick={onClick}
        disabled={disabled || loading}
        className={className}
        aria-label={loading ? __('Saving settings...', 'nightly') : __('Save settings', 'nightly')}
    >
        {loading && <Spinner />}
        {loading ? __('Saving...', 'nightly') : __('Save Settings', 'nightly')}
    </Button>
);

export default SaveButton;