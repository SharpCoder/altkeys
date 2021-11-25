<script type="ts">

</script>

<style>
    select {
        border: 2px solid var(--white);
        padding: 4px;
        width: 120px;
    }

    button {
        padding: 4px;
        border: 2px solid var(--white);
    }

    .action-list-container {
        padding-top: 10px;
    }

    .action-list {
        display: flex;
        flex-direction: row;
    }

    .action-item {
        margin-right: 15px;
    }
</style>

<div class="action-list-container">
    
    <div class="action-list">
        <div class="action-item">
            <select>
                <option>Half-Qwerty</option>
                <option>System Default</option>
            </select>
        </div>
        <div class="action-item">
            <button>
                Reset
            </button>
        </div>
    </div>
</div>